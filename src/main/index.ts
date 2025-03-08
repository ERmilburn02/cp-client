import { app, shell, BrowserWindow, App, Menu } from 'electron'
import { join } from 'path'
import { optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { menu } from './menu'

import electronUpdater, { type AppUpdater } from 'electron-updater'
const getAutoUpdater: () => AppUpdater = () => {
  const { autoUpdater } = electronUpdater
  return autoUpdater
}

try {
  getAutoUpdater().checkForUpdatesAndNotify()
} catch (e) {
  console.error(e)
}

const baseFlashPath = join(__dirname, '../../resources/flash').replace(
  'app.asar',
  'app.asar.unpacked'
)
const winflash32 = join(baseFlashPath, 'pepflashplayer32_32_0_0_303.dll')
const winflash64 = join(baseFlashPath, 'pepflashplayer64_32_0_0_303.dll')
const macflash = join(baseFlashPath, 'PepperFlashPlayer.plugin')
const linuxflash = join(baseFlashPath, 'libpepflashplayer.so')

const getPluginName: () => { path: string; version: string } = () => {
  let pluginName: string = ''
  let pluginVer: string = ''

  switch (process.platform) {
    case 'win32':
      pluginVer = '32.0.0.303'
      switch (process.arch) {
        case 'ia32':
          pluginName = winflash32
          break

        default:
        case 'x64':
          pluginName = winflash64
          break
      }
      break
    case 'darwin':
      pluginName = macflash
      pluginVer = '34.0.0.231'
      break
    case 'linux':
      pluginName = linuxflash
      pluginVer = '32.0.0.303' // I'm not 100% sure what the version of this is so I'm just guessing.
      break
  }

  return {
    path: pluginName,
    version: pluginVer
  }
}

const loadFlashPlugin: (app: App) => void = (app: App) => {
  const pluginInfo = getPluginName()

  app.commandLine.appendSwitch('ppapi-flash-path', pluginInfo.path)
  // We actually need to specify the version or else it will show the Flash upgrade error page when refreshing.
  app.commandLine.appendSwitch('ppapi-flash-version', pluginInfo.version)

  if (process.platform == 'linux') {
    app.commandLine.appendArgument('no-sandbox')
  }
}

loadFlashPlugin(app)

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    show: false,
    // autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      plugins: true
    }
  })

  Menu.setApplicationMenu(menu)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // We can't use this method since it's too new
  // mainWindow.webContents.setWindowOpenHandler((details) => {
  //   shell.openExternal(details.url)
  //   return { action: 'deny' }
  // })
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  app.setAppUserModelId('com.ermilburn02.cp-client')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

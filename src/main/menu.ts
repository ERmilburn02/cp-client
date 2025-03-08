import { is } from '@electron-toolkit/utils'
import { app, dialog, Menu, type MenuItem, type MenuItemConstructorOptions } from 'electron'
import { join } from 'path'

// const isMac = process.platform === 'darwin'

const menuTemplate: Array<MenuItemConstructorOptions | MenuItem> = [
  {
    label: app.name,
    submenu: [
      {
        label: 'Home',
        click(_, browserWindow): void {
          if (!browserWindow) {
            throw new Error('Menu clicked without a browser window!')
          }
          if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            browserWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
          } else {
            browserWindow.loadFile(join(__dirname, '../renderer/index.html'))
          }
        }
      },
      {
        label: 'Clear Cache',
        click(_, browserWindow): void {
          if (!browserWindow) {
            throw new Error('Menu clicked without a browser window!')
          }

          browserWindow.webContents.session.clearCache()
        }
      },
      {
        label: 'Toggle Developer Tools',
        click(_, browserWindow): void {
          if (!browserWindow) {
            throw new Error('Menu clicked without a browser window!')
          }

          if (browserWindow.webContents.isDevToolsOpened()) {
            browserWindow.webContents.closeDevTools()
            return
          }

          const confirmDialog = dialog.showMessageBoxSync(browserWindow, {
            title: 'Do you really want to open dev tools?',
            message: 'The dev tools may contain sensitive information about your current session.',
            buttons: ['Yes', 'No']
          })

          if (confirmDialog !== 0) {
            return
          }

          browserWindow.webContents.openDevTools()
        }
      },
      { type: 'separator' },
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }
  // { role: 'editMenu' }
  //   {
  //     label: 'Edit',
  //     submenu: [
  //       { role: 'undo' },
  //       { role: 'redo' },
  //       { type: 'separator' },
  //       { role: 'cut' },
  //       { role: 'copy' },
  //       { role: 'paste' },
  //       ...(isMac
  //         ? [
  //             { role: 'pasteAndMatchStyle' },
  //             { role: 'delete' },
  //             { role: 'selectAll' },
  //             { type: 'separator' },
  //             {
  //               label: 'Speech',
  //               submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }]
  //             }
  //           ]
  //         : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
  //     ]
  //   },
  //   // { role: 'viewMenu' }

  //   // { role: 'windowMenu' }
  //   {
  //     label: 'Window',
  //     submenu: [
  //       { role: 'minimize' },
  //       { role: 'zoom' },
  //       ...(isMac
  //         ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
  //         : [{ role: 'close' }])
  //     ]
  //   }
]

export const menu = Menu.buildFromTemplate(menuTemplate)

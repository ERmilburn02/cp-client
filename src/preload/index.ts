import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  versions: electronAPI.process.versions
}

// Use `contextBridge` APIs to expose Electron APIs to renderer
try {
  contextBridge.exposeInMainWorld('cpClientApi', api)
} catch (error) {
  console.error(error)
}

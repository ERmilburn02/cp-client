import { ElectronAPI } from '@electron-toolkit/preload'

interface CustomAPI {
  versions: {
    [key: string]: string | undefined
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    cpClientApi: CustomAPI
  }
}

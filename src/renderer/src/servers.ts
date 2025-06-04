export type ServerInfo = {
  name: string
  url: string
  logo: string | null
}

export const servers: Readonly<Array<ServerInfo>> = [
  {
    name: 'New Club Penguin',
    url: 'https://newcp.net/en-US/game',
    logo: 'https://newcp.net/logo.png'
  },
  {
    name: 'Localhost (Vanilla)',
    url: 'http://play.localhost/',
    logo: null
  },
  {
    name: 'Localhost (Legacy)',
    url: 'http://old.localhost/',
    logo: null
  }
] as const

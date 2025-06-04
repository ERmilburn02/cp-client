import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { ServerInfo } from '@renderer/servers'
import { Button } from './ui/button'

export function ServerButton({ server }: { server: ServerInfo }): JSX.Element {
  const [imgError, setImgError] = useState(false)
  const showFallback = !server.logo || imgError

  return (
    <Button asChild className="h-20 w-72 px-4 flex items-center gap-4 overflow-hidden">
      <a href={server.url} className="flex items-center gap-4 w-full h-full">
        <div
          className={`h-14 w-14 [&_svg]:size-8 flex items-center justify-center rounded ${
            showFallback ? 'bg-muted' : ''
          }`}
        >
          {!showFallback && server.logo ? (
            <img
              src={server.logo}
              alt={`${server.name} logo`}
              className="h-full w-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <ImageIcon className="text-muted-foreground" />
          )}
        </div>
        <span className="text-lg truncate">{server.name}</span>
      </a>
    </Button>
  )
}

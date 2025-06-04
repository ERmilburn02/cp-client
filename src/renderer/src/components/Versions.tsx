import { useState } from 'react'
import { Badge } from './ui/badge'

function Versions(): JSX.Element {
  const [versions] = useState(window.cpClientApi?.versions ?? {})
  const [flashVersion] = useState<string | null>(
    navigator.plugins['Shockwave Flash']?.description.substring('Shockwave Flash '.length) || null
  )

  return (
    <>
      <Badge>Electron v{versions.electron || 'Unknown'}</Badge>
      <Badge>Chromium v{versions.chrome || 'Unknown'}</Badge>
      <Badge>Node v{versions.node || 'Unknown'}</Badge>
      {flashVersion && <Badge>Flash v{flashVersion}</Badge>}
    </>
  )
}

export default Versions

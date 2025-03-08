import { useState } from 'react'

import { Badge } from './ui/badge'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)
  const [flashVersion] = useState<string | null>(
    navigator.plugins['Shockwave Flash']?.description.substring('Shockwave Flash '.length) || null
  )

  return (
    <>
      <Badge>Electron v{versions.electron}</Badge>
      <Badge>Chromium v{versions.chrome}</Badge>
      <Badge>Node v{versions.node}</Badge>
      {flashVersion && <Badge>Flash v{flashVersion}</Badge>}
    </>
  )
}

export default Versions

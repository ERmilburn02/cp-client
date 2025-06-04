import { ServerButton } from './components/ServerButton'
import Versions from './components/Versions'
import { servers } from './servers'

function App(): JSX.Element {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 place-items-center m-2">
        {servers.map((server, i) => (
          <ServerButton key={i} server={server} />
        ))}
      </div>
      <Versions></Versions>
    </>
  )
}

export default App

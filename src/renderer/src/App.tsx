import { Button } from './components/ui/button'
import Versions from './components/Versions'
import { servers } from './servers'

function App(): JSX.Element {
  return (
    <>
      <div className="grid grid-cols-4 space-x-2 place-items-center">
        {servers.map((server, i) => (
          <Button key={i} asChild className="h-16 w-64">
            <a href={server.url} className="text-lg">
              {server.logo && <img src={server.logo} className=" h-full object-contain" />}
              {server.name}
            </a>
          </Button>
        ))}
      </div>
      <Versions></Versions>
    </>
  )
}

export default App

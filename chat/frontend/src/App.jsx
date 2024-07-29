import { useState } from "react"
import Auth from "./components/Auth"
import Chat from "./components/Chat"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') != null)

  const styles = {
    'flex': '1',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': !isAuthenticated ? 'center' : 'flex-end',
  }

  return (
    <>
      <header className='container'>
        <h1 style={{ cursor: 'pointer', fontFamily: 'monospace' }}>
          <mark>chat.js</mark>
        </h1>
        <p>Your Open Chat Platform</p>
        <hr />
      </header>


      <main className='container' style={styles}>
        {isAuthenticated ? <Chat /> : <Auth onAuth={() => setIsAuthenticated(true)} />}
      </main>
    </>
  )
}

export default App

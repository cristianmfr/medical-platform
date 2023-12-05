import { useState } from 'react'
import './App.css'

// componentes
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

// outlet para utilizar header e footer
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <Header />
      </header>
      <body>
        <Outlet />
      </body>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App

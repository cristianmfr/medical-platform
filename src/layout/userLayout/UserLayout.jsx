import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Firebase';

import './UserLayout.css'

// outlet para utilizar header e footer
import { Outlet, Link } from 'react-router-dom'
import UserHeader from '../../components/userHeader/UserHeader'

function UserLayout() {
  const [count, setCount] = useState(0)

  const [userId, setUserId] = useState("")

  useEffect(() => {
      onAuthStateChanged(auth, (user) => { 
          if (user) {
              setUserId(user.uid)
          } else {
              console.log("Usuário não está logado")
          }
      })
  })

  return (
    <>
      <header>
          <UserHeader/>
      </header>
        <body>
          <div className="main-user-layout-container">
          <div className="other-options">
              <div className="account-settings">
                <h3>Conta</h3>
                <Link to={`config/${userId}`}>Configurações de conta</Link>
              </div>
              <div className="medical-appointment">
                <h3>Consultas</h3>
                <Link to={`config/consultas-agendadas/${userId}`}>Consultas agendadas</Link>
              </div>
            </div>
          <Outlet/>
          </div>
        </body>
      <footer>
            
      </footer>
    </>
  )
}

export default UserLayout
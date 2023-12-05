import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// importanto o router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// layouts
import Layout from './layout/mainLayout/Layout.jsx'
import MedicLayout from './layout/medicLayout/MedicLayout.jsx'
import UserLayout from './layout/userLayout/userLayout.jsx'

// paginas principais
import Homepage from './views/homepage/Homepage.jsx'
import Business from './views/business/Business.jsx'

// autenticação de usuário - comum
import UserLogin from './views/userLogin/UserLogin.jsx'
import UserSignUp from './views/userSignUp/UserSignUp.jsx'
import AccountConfig from './views/userPage/accountConfig/AccountConfig.jsx'

// autenticação de usuário - profissional
import MedicLogin from './views/medicLogin/MedicLogin.jsx'
import MedicSignUp from './views/medicSignUp/MedicSignUp.jsx'

// recuperação de senha
import PasswordRecovery from './views/passwordRecovery/PasswordRecovery.jsx'

// paginas de pesquisa
import SearchPage from './views/search/SearchPage.jsx'
import MedicPage from './views/medicPage/MedicPage.jsx'
import SearchResults from './views/searchResults/SearchResults.jsx'

// erro
import ErrorPage from './views/errorPage/ErrorPage.jsx'

// gerenciamento do medico
import MedicManagement from './views/medicManagement/MedicManagement.jsx'
import Appointment from './views/userPage/appointments/Appointment.jsx'

// rotas
const router = createBrowserRouter ([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "business",
        element: <Business />
      },
      {
        path: "user-login",
        element: <UserLogin />,
      },
      {
        path: "user-signup",
        element: <UserSignUp />
      },
      {
        path: "medic-login",
        element: <MedicLogin />
      },
      {
        path: "medic-signup",
        element: <MedicSignUp />
      },
      {
        path: "password-recovery",
        element: <PasswordRecovery />
      },
      {
        path: "medic-man",
        element: <MedicManagement/>
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: "medic/:medicoId",
        element: <MedicPage />
      },
      {
        path: "search-results",
        element: <SearchResults />
      }
    ]
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      {
        path: "config/:userId",
        element: <AccountConfig />
      },
      {
        path: "config/consultas-agendadas/:userId",
        element: <Appointment />
      }
    ]
    },
  {
    path: "medic",
    element: <MedicLayout />,
    children: [
      {
        path: "management/:userId",
        element: <MedicManagement />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

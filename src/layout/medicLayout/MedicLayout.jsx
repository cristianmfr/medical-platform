import { useState } from 'react'
import './MedicLayout.css'

// outlet para utilizar header e footer
import { Outlet } from 'react-router-dom'

import MedicManagement from '../../views/medicManagement/MedicManagement'

import MedicHeader from '../../components/medicHeader/medicHeader'

function MedicLayout() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header>
      <MedicHeader />
    </header>
      <body>
        <MedicManagement />
      </body>
    </>
  )
}

export default MedicLayout
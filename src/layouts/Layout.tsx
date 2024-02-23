import { Outlet } from 'react-router-dom'
import Navbar from '../components/nav/Navbar'

const Layout = () => {

  return (
    <>
      <header>
        <Navbar />
        {/* <h1>Navigation</h1> */}
      </header>
      <main>
        {/* <AlertConfirm /> */}
        <Outlet />
      </main>
      <footer>
        {/* <h1>Footer</h1> */}
      </footer>
    </>
  )
}

export default Layout
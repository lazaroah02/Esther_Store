import './App.css'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Store from './store_pages/Store'
import ProductsManagement from './store_pages/ProductsManagement'
import Home from './store_pages/Home'
import ManagementMenu from './store_pages/ManagementMenu.jsx'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {CartContextProvider} from './context/cartContext.jsx'
import {QueryFiltersContextProvider} from './context/filtersContext.jsx'
import {AuthenticationContextProvider} from './context/authenticationContext.jsx'
import NavBar from './components/NavBar/index.jsx'
import Footer  from './components/Footer/index.jsx'
import ManagementOferts from './store_pages/ManagementOferts.jsx'
import ManagementSecurity from './store_pages/ManagementSecurity.jsx'
import ManagementContact from './store_pages/ManagementContact.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './store_pages/Login.jsx'
import ChangePassword from './store_pages/ChangePassword.jsx'
import Bye from './store_pages/Bye.jsx'
import 'primeicons/primeicons.css';
import './index.css'
import {Page404} from './store_pages/Page404.jsx'

function App() {
  return (
    <Router>
      <PrimeReactProvider>
        <AuthenticationContextProvider>
          <CartContextProvider>
            <QueryFiltersContextProvider>
              <section >
                <header><NavBar /></header>
                <section className="main-section-route">
                  <Routes>
                    <Route path = "/" element = {<Home/>}/>
                    <Route path = "/store" element = {<Store/>}/>
                    <Route path = "/management-menu" element = {<ProtectedRoute><ManagementMenu/></ProtectedRoute>}/>
                    <Route path = "/management/products" element = {<ProtectedRoute><ProductsManagement/></ProtectedRoute>}/>
                    <Route path = "/management/oferts" element = {<ProtectedRoute><ManagementOferts/></ProtectedRoute>}/>
                    <Route path = "/management/security" element = {<ProtectedRoute><ManagementSecurity/></ProtectedRoute>}/>
                    <Route path = "/management/contact" element = {<ProtectedRoute><ManagementContact/></ProtectedRoute>}/>
                    <Route path = "/login" element = {<Login/>}/>
                    <Route path = "/change-password" element = {<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
                    <Route path = "/bye" element = {<Bye/>}/>
                    <Route path = "*" element = {<Page404/>}/>
                  </Routes>
                </section>
                <footer><Footer/></footer>
              </section>
            </QueryFiltersContextProvider>
          </CartContextProvider>
        </AuthenticationContextProvider>
      </PrimeReactProvider>
    </Router>
  )
}

export default App

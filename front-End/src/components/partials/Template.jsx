import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import './css/header.css'
import './css/sidebar.css'
import './css/footer.css'

const Header = () => {
  return (
    <header className='header'>
      <div className='header_container'>
        <div className='header_logo'>
          {/* <img src={logo} alt='logo' /> */}
        </div>
        <div className='header_menu'>
          <ul>
            <li><a href='/'>Administrador</a></li>
            <li><a href='/contact'>Nombre del autolavado</a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar_container'>
        <div className='sidebar_menu'>
          <h2>Menu</h2>
          <ul>
            <li>
              <NavLink
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? 'red' : 'inherit',
                    textDecoration: 'none'
                  }
                }}
                className={({ isActive, isPending }) => {
                  return isActive ? 'active' : isPending ? 'pending' : ''
                }}
                // Modificar endpoint
                to='/inventario'
              >Inventario
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? 'red' : 'inherit',
                    textDecoration: 'none'
                  }
                }}
                className={({ isActive, isPending }) => {
                  return isActive ? 'active' : isPending ? 'pending' : ''
                }}
                // Moificar endpoint
                to='/aceites'
              >Aceite
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? 'red' : 'inherit',
                    textDecoration: 'none'
                  }
                }}
                className={({ isActive, isPending }) => {
                  return isActive ? 'active' : isPending ? 'pending' : ''
                }}
                // Moificar endpoint
                to='/filtros'
              >Filtro
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? 'red' : 'inherit',
                    textDecoration: 'none'
                  }
                }}
                className={({ isActive, isPending }) => {
                  return isActive ? 'active' : isPending ? 'pending' : ''
                }}
                // Moificar endpoint
                to='/servicios'
              >Servicios
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? 'red' : 'inherit',
                    textDecoration: 'none'
                  }
                }}
                className={({ isActive, isPending }) => {
                  return isActive ? 'active' : isPending ? 'pending' : ''
                }}
                // Moificar endpoint
                to='/clientes'
              >Clientes
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? 'red' : 'inherit',
                    textDecoration: 'none'
                  }
                }}
                className={({ isActive, isPending }) => {
                  return isActive ? 'active' : isPending ? 'pending' : ''
                }}
                // Moificar endpoint
                to='/pedidos'
              >Pedidos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_container'>
        <p>Autolavado (nombre del autolavado)</p>
        <p>©Derechos reservados - Powered by NodeJS - 2023</p>
      </div>
    </footer>
  )
}

const Template = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Template

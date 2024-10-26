import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AceitesView from '././components/views/Aceites.view.jsx'
import FiltrosView from '././components/views/Filtros.view.jsx'
import InventariosView from '././components/views/Inventario.view.jsx'
import ServiciosView from '././components/views/Servicios.view.jsx'
import ClientesView from '././components/views/Clientes.view.jsx'
import PedidosView from './components/views/Pedidos.view.jsx'
import SidebarWithHeader from './components/partials/SidebarWithHeader.jsx'
import { FormularioPedidoProvider } from './context/FormularioPedido.jsx'
import MainView from './components/views/Main.view.jsx'
import VerPedidosView from './components/views/VerPedidos.view.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarWithHeader />,
    children: [
      {
        path: '/',
        element: <MainView />
      },
      {
        path: '/aceites',
        element: <AceitesView />
      },
      {
        path: '/filtros',
        element: <FiltrosView />
      },
      {
        path: '/inventario',
        element: <InventariosView />
      },
      {
        path: '/servicios',
        element: <ServiciosView />
      },
      {
        path: '/clientes',
        element: <ClientesView />
      },
      {
        path: '/pedidos',
        element: <PedidosView />
      },
      {
        path: '/visualizar-pedidos',
        element: <VerPedidosView />
      }, {
        path: '/visualizar-pedido/:id'
        // element: <VisualizarUnPedido />
      }
    ]
  }
])

function App () {
  return (
    <FormularioPedidoProvider>
      <RouterProvider router={router} />
    </FormularioPedidoProvider>
  )
}
export default App

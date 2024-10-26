import { createContext, useState } from 'react'

export const PedidoContext = createContext()

export const FormularioPedidoProvider = ({ children }) => {
  const [clientes, setClientes] = useState([])
  const [filtros, setFiltros] = useState([])
  const [aceites, setAceites] = useState([])
  const [inventario, setInventario] = useState([])
  const [servicios, setServicios] = useState([])
  const [pedidos, setPedidos] = useState([])
  return (
    <PedidoContext.Provider
      value={{
        clientes,
        setClientes,
        filtros,
        setFiltros,
        aceites,
        setAceites,
        inventario,
        setInventario,
        servicios,
        setServicios,
        pedidos,
        setPedidos
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}

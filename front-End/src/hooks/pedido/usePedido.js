import { useContext, useMemo } from 'react'
import { getAceites } from '../../service/aceites'
import { getFiltros } from '../../service/filtros'
import { getClientes } from '../../service/cliente'
import { PedidoContext } from '../../context/FormularioPedido'
import { getInventario } from '../../service/inventario'
import { getServicios } from '../../service/washservice'
import { getPedidos } from '../../service/pedidos'

export const usePedido = () => {
  const { clientes, setClientes, aceites, setAceites, filtros, setFiltros, inventario, setInventario, servicios, setServicios, pedidos, setPedidos } = useContext(PedidoContext)
  useMemo(() => {
    getAceites()
      .then((data) => setAceites(data.data))
      .catch((error) => console.log(error))
    getFiltros()
      .then((data) => setFiltros(data.data))
      .catch((error) => console.log(error))
    getClientes()
      .then((clientes) => setClientes(clientes.data))
      .catch((error) => console.log(error))
    getInventario()
      .then((inventario) => setInventario(inventario.data))
      .catch((error) => console.log(error))
    getServicios()
      .then((servicios) => setServicios(servicios.data))
      .catch((error) => console.log(error))
    getPedidos()
      .then((pedidos) => setPedidos(pedidos.data))
      .catch((error) => console.log(error))
  }, [])
  return { aceites, filtros, clientes, inventario, servicios, pedidos }
}

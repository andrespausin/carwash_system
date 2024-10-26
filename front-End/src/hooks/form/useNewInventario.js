import { useEffect, useState } from 'react'
import { deleteInventario } from '../../service/inventario'
import { alertToast } from '../toast/alertToast'
import { useToast } from '@chakra-ui/react'

export const useNewInventario = (editData) => {
  const [deleteData, setDeleteData] = useState(null)
  const toast = useToast()

  useEffect(() => {
    if (deleteData) {
      alertToast(true, toast, 'success', deleteInventario, deleteData.idProducto, refreshPage, 'Inventario eliminado', 'El inventario ha sido eliminado correctamente')
    }
  })
  const refreshPage = () => {
    window.location.reload()
  }

  return { setDeleteData }
}

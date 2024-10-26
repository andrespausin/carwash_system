import service from '../service/v2/pedido.service.js'

export const getNotasById = async (req, res) => {
  const { id } = req.params
  try {
    const data = await service.getNotasById(id)
    res.json({ message: 'Notas encontradas', data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createNota = async (req, res) => {
  const { idPedido, nota } = req.body
  try {
    const data = await service.createNota(idPedido, nota)
    res.json({ message: 'Nota creada correctamente', data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteNota = async (req, res) => {
  const { id } = req.params
  try {
    await service.deleteNota(id)
    res.json({ message: 'Nota eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

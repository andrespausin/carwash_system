import service from '../../service/v1/washservice.service.js'
import { fechaFormat } from './utils/fechaFormat.js'

export const getAllWashServices = async (req, res) => {
  try {
    const washServices = await service.getAllWashServices()
    const data = washServices.map((service) => {
      return {
        ...service,
        fecha: fechaFormat(service.fecha)
      }
    })
    if (washServices.length === 0) {
      return res.send({
        status: 200,
        message: 'No hay servicios de lavado registrados',
        data
      })
    } else if (washServices.length > 0) {
      res.send({
        status: 200,
        message: 'Servicios de lavado encontrados',
        data
      })
    } else {
      res.send({
        status: 404,
        message: 'No se encontraron servicios de lavado'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los servicios de lavado',
      error: error.message
    })
  }
}

export const getWashServicesComplete = async (req, res) => {
  try {
    const washServices = await service.getWashServicesComplete()
    const data = washServices.map((service) => {
      return {
        ...service,
        fecha: fechaFormat(service.fecha)
      }
    })
    if (washServices.length === 0) {
      return res.send({
        status: 200,
        message: 'No se encontraron servicios de lavado completo',
        data
      })
    } else if (washServices.length > 0) {
      res.send({
        status: 200,
        message: 'Servicios de lavado completo encontrados',
        data
      })
    } else {
      res.send({
        status: 404,
        message: 'No se encontraron servicios de lavado completo'
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los servicios de lavado completo',
      error: error.message
    })
  }
}

export const getWashServicesBasic = async (req, res) => {
  try {
    const washServices = await service.getWashServicesBasic()
    const data = washServices.map((service) => {
      return {
        ...service,
        fecha: fechaFormat(service.fecha)
      }
    })
    if (washServices.length === 0) {
      return res.send({
        status: 200,
        message: 'No se encontraron registrados servicios de lavado básico',
        data
      })
    } else if (washServices.length > 0) {
      res.send({
        status: 200,
        message: 'Servicios de lavado básico encontrados',
        data
      })
    } else {
      res.send({
        status: 404,
        message: 'No se encontraron servicios de lavado básico',
        data
      })
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al obtener los servicios de lavado básico',
      error: error.message
    })
  }
}

export const createWashService = async (req, res) => {
  try {
    const { idPedido, placa, marca, modelo, tipoServicio, precio, fecha } = req.body
    const servicio = {
      idPedido,
      placa,
      marca,
      modelo,
      tipoServicio,
      precio,
      fecha
    }
    const newServicio = await service.createWashService(servicio)
    res.status(201).send({
      status: 201,
      message: 'Servicio creado',
      data: newServicio
    })
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Error al crear el servicio de lavado',
      error: error.message
    })
  }
}

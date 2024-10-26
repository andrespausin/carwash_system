export const alertToast = (condition, toast, status, onSuccessMethod = null, object = null, refreshPage = null, title, description, time = 1000) => {
  condition
    ? (
        toast({
          title,
          description,
          status,
          duration: time,
          isClosable: true,
          position: 'top-right',
          onCloseComplete: onSuccessMethod
            ? () => {
                onSuccessMethod(object)
                refreshPage()
              }
            : null
        }))
    : (
        toast({
          title: 'Error',
          description,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        }))
}

export const alertToastAceite = ({ condition, toast, onSuccessMethod, object, refreshPage }) => {
  condition
    ? (
        toast({
          title: 'Aceite creado',
          description: 'El aceite ha sido creado correctamente',
          status: 'success',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
          onCloseComplete: onSuccessMethod
            ? () => {
                onSuccessMethod(object)
                refreshPage()
              }
            : null
        }))
    : (
        toast({
          title: 'Error',
          description: 'Por favor, verifique los datos ingresados',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        }))
}

export const alertToastFiltro = ({ condition, toast, onSuccessMethod, object, refreshPage }) => {
  condition
    ? (
        toast({
          title: 'Filtro creado',
          description: 'El filtro ha sido creado correctamente',
          status: 'success',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
          onCloseComplete: onSuccessMethod
            ? () => {
                onSuccessMethod(object)
                refreshPage()
              }
            : null
        }))
    : (
        toast({
          title: 'Error',
          description: 'Por favor, verifique los datos ingresados',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        }))
}

export const alertToastCliente = ({ condition, toast, onSuccessMethod, object, refreshPage }) => {
  condition
    ? (
        toast({
          title: 'Cliente creado',
          description: 'El cliente ha sido creado correctamente',
          status: 'success',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
          onCloseComplete: onSuccessMethod
            ? () => {
                onSuccessMethod(object)
                refreshPage()
              }
            : null
        }))
    : (
        toast({
          title: 'Error',
          description: 'Por favor, verifique los datos ingresados',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        }))
}

export const alertToastAbono = ({ condition, toast, onSuccessMethod, object, refreshPage }) => {
  condition
    ? (
        toast({
          title: 'Abono y/o Nota creado',
          description: 'Se han añadido detalles al pedido correctamente',
          status: 'success',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
          onCloseComplete: onSuccessMethod
            ? () => {
                onSuccessMethod(object)
                refreshPage()
              }
            : null
        }))
    : (
        toast({
          title: 'Error',
          description: 'Por favor, verifique los datos ingresados',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        }))
}

export const alertToastDeletePedido = ({ condition, toast, onSuccessMethod, object, refreshPage }) => {
  condition
    ? (
        toast({
          title: 'Eliminado el pedido corretamente ',
          description: 'Se han eliminado los detalles del pedido correctamente',
          status: 'error',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
          onCloseComplete: onSuccessMethod
            ? () => {
                onSuccessMethod(object)
                refreshPage()
              }
            : null
        }))
    : (
        toast({
          title: 'Error',
          description: 'Por favor, verifique los datos ingresados',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        }))
}

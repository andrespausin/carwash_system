const RUTA_ACEITES = 'http://localhost:3000/api/v1/inventario/aceites'
const RUTA_FILTROS = 'http://localhost:3000/api/v1/inventario/filtros'
const RUTA_INVENTARIO = 'http://localhost:3000/api/v1/inventario'
const RUTA_SERVICIO = 'http://localhost:3000/api/v1/washservice'
const RUTA_CLIENTES = 'http://localhost:3000/api/v1/clientes'
const RUTA_PEDIDO = 'http://localhost:3000/api/v1/pedido'
const RUTA_ACEITES_ID = 'http://localhost:3000/api/v1/inventario/aceites/all/id'
const RUTA_FILTROS_ID = 'http://localhost:3000/api/v1/inventario/filtros/all/id'
const RUTA_CLIENTES_ID = 'http://localhost:3000/api/v1/clientes/all/id'

const RUTA_SPLINE = 'http://localhost:3000/api/v2/dashboard/sales-per-month'
const RUTA_DONUT = 'http://localhost:3000/api/v2/dashboard/'
const RUTA_TABLA_INVENTARIO = 'http://localhost:3000/api/v2/inventario'

const TIPO_ACEITES = ['Aceite Sintético', 'Aceite Semi-sintético', 'Aceite Mineral', 'Fórmula', 'Ducha', 'Refrigerante', 'Diesel 50', 'Hidráulico 68', 'Transmisión 80-90', 'Transmisión 85-90', 'Diesel 1540', 'Paila 20-50', 'Otros']
const TIPO_FILTROS = ['Aire', 'Aceite', 'Combustible', 'Hidráulico', 'Transmisión']
const TIPO_LAVADO = ['Lavado básico', 'Lavado completo', 'Engrase', 'Mecánica', 'Lavado de chasis', 'Lavado de motor', 'Otro']
const PAID_OPTIONS = ['Todos', 'Pagado', 'No pagado']

const COLUMNS_VENTAS = [
  { key: 'descripcion', name: 'Nota' },
  { key: 'idProducto', name: 'Producto' },
  { key: 'idCategoria', name: 'Tipo de producto' },
  { key: 'cantidad', name: 'cantidad' },
  { key: 'total', name: 'Total' }
]

const COLUMNS_SERVICIOS = [
  { key: 'placa', name: 'Nota' },
  { key: 'marca', name: 'Marca' },
  { key: 'modelo', name: 'Modelo' },
  { key: 'tipoServicio', name: 'Tipo de lavado' },
  { key: 'precio', name: 'Monto' }
]

const COLUMNS_ACEITES = [
  { key: 'idProducto', name: 'ID' },
  { key: 'marca', name: 'Marca' },
  { key: 'tipo', name: 'Tipo' },
  { key: 'viscosidad', name: 'Descripción' },
  { key: 'unidad_por_empaque', name: 'UnidadPorEmpaque' },
  { key: 'precio_compra_empaque', name: 'P.C. Empaque' },
  { key: 'precio_compra_unidad', name: 'P.C. Unidad' },
  { key: 'precio_venta_empaque', name: 'P.V. Empaque' },
  { key: 'precio_venta_unidad', name: 'P.V. Unidad' }
]

const COLUMNS_CLIENTES = [
  { key: 'idCliente', name: 'ID' },
  { key: 'nombre', name: 'Nombre' },
  { key: 'telefono', name: 'Teléfono' },
  { key: 'direccion', name: 'Dirección' },
  { key: 'email', name: 'Correo' }
]

const COLUMNS_NOTES = [
  { key: 'fecha', name: 'Fecha de la nota' },
  { key: 'descripcion', name: 'Descripción' }
]

const DONUT_STRUCTURE = {
  theme: 'dark2',
  backgroundColor: 'transparent',
  animationEnabled: true,
  title: {
    text: '',
    fontColor: 'white'
  },
  subtitles: [{
    text: '',
    verticalAlign: 'center',
    fontColor: 'white',
    fontSize: 24,
    dockInsidePlotArea: true
  }],
  data: [{
    type: 'doughnut',
    showInLegend: true,
    indexLabel: '{name}: {y}',
    yValueFormatString: "#,###'%'",
    dataPoints: [
      // { name: 'Unsatisfied', y: 5 },
      // { name: 'Very Unsatisfied', y: 31 },
      // { name: 'Very Satisfied', y: 40 },
      // { name: 'Satisfied', y: 17 },
      // { name: 'Neutral', y: 7 }
    ]
  }]
}

const SPLINE_STRUCTURE = {
  backgroundColor: 'transparent',
  theme: 'dark2',
  animationEnabled: true,
  title: {
    text: 'Ventas mensuales'
  },
  axisX: {
    title: 'Meses'
  },
  axisY: {
    title: 'Ventas (en $)',
    prefix: '$'
  },
  data: [{
    yValueFormatString: '$#,###',
    xValueFormatString: 'MMM',
    type: 'spline',
    dataPoints: [
      // { x: new Date(2017, 0), y: 25060 },
      // { x: new Date(2017, 1), y: 27980 },
      // { x: new Date(2017, 2), y: 42800 },
      // { x: new Date(2017, 3), y: 32400 },
      // { x: new Date(2017, 4), y: 35260 },
      // { x: new Date(2017, 5), y: 33900 },
      // { x: new Date(2017, 6), y: 40000 },
      // { x: new Date(2017, 7), y: 52500 },
      // { x: new Date(2017, 8), y: 32300 },
      // { x: new Date(2017, 9), y: 42000 },
      // { x: new Date(2017, 10), y: 37160 },
      // { x: new Date(2017, 11), y: 38400 }
    ]
  }]
}

export {
  RUTA_ACEITES,
  RUTA_FILTROS,
  RUTA_INVENTARIO,
  RUTA_SERVICIO,
  RUTA_CLIENTES,
  TIPO_ACEITES,
  TIPO_FILTROS,
  TIPO_LAVADO,
  RUTA_PEDIDO,
  RUTA_ACEITES_ID,
  RUTA_FILTROS_ID,
  RUTA_CLIENTES_ID,
  COLUMNS_VENTAS,
  COLUMNS_SERVICIOS,
  COLUMNS_ACEITES,
  COLUMNS_CLIENTES,
  DONUT_STRUCTURE,
  SPLINE_STRUCTURE,
  RUTA_SPLINE,
  RUTA_DONUT,
  RUTA_TABLA_INVENTARIO,
  COLUMNS_NOTES,
  PAID_OPTIONS
}

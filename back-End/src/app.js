import express from 'express'
import cors from 'cors'
import washServiceRoutes from './routes/v1/washservice.routes.js'
import inventarioRoutes from './routes/v1/inventario.routes.js'
import clienteRoutes from './routes/v1/cliente.routes.js'
import pedidoRoutes from './routes/v1/pedido.routes.js'
import dashboardRoutes from './routes/v2/dashboard.routes.js'
import invetarioRoutesV2 from './routes/v2/inventario.routes.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1/washservice', washServiceRoutes)
app.use('/api/v1/inventario', inventarioRoutes)
app.use('/api/v1/clientes', clienteRoutes)
app.use('/api/v1/pedido', pedidoRoutes)
app.use('/api/v2/dashboard', dashboardRoutes)
app.use('/api/v2/inventario', invetarioRoutesV2)

export default app

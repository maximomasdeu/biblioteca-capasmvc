import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import librosRoutes from './routes/libros.js'
import sociosRoutes from './routes/socios.js'
import prestamosRoutes from './routes/prestamos.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/libros', librosRoutes)
app.use('/api/socios', sociosRoutes)
app.use('/api/prestamos', prestamosRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`)
})

import { Router } from 'express'
import { listarLibros, crearLibro } from '../controllers/librosController.js'
const router = Router()

router.get('/', listarLibros)
router.post('/', crearLibro)

export default router

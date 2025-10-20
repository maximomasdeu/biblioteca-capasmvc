import { Router } from 'express'
import { listarLibros, crearLibro, eliminarLibro } from '../controllers/librosController.js'
const router = Router()


router.get('/', listarLibros)
router.post('/', crearLibro)
router.delete('/:id', eliminarLibro)

export default router

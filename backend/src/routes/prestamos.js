import { Router } from 'express'
import { listarPrestamos, crearPrestamo, devolverPrestamo } from '../controllers/prestamosController.js'
const router = Router()

router.get('/', listarPrestamos)
router.post('/', crearPrestamo)
router.post('/:id/devolver', devolverPrestamo)

export default router

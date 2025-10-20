import { Router } from 'express'
import { listarSocios, crearSocio, eliminarSocio } from '../controllers/sociosController.js'
const router = Router()


router.get('/', listarSocios)
router.post('/', crearSocio)
router.delete('/:id', eliminarSocio)

export default router

import { Router } from 'express'
import { listarSocios, crearSocio } from '../controllers/sociosController.js'
const router = Router()

router.get('/', listarSocios)
router.post('/', crearSocio)

export default router

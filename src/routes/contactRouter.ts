import express from 'express'
import { submitContact } from '../controllers/contactController'
import { contactLimiter } from '../middlewares/contactMiddleware'
import { errorHandler } from '../middlewares/errorMiddlerwar'

const router = express.Router()

router.post('/', contactLimiter, submitContact)

export default router

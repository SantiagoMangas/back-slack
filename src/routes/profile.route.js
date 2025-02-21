import express from 'express'
import { updateUserInfoContoller } from '../controllers/profile.controller.js'

const profileRouter = express.Router()

profileRouter.put('/', updateUserInfoContoller )

export default profileRouter    
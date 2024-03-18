import express from 'express'
import { deleteUser, followUser, getUser, unFollowUser, updateUser } from '../Controller/userController.js'

const userRoutes = express.Router()

userRoutes.get('/info/get-user/:id',getUser)
userRoutes.put('/info/update-user/:id',updateUser)
userRoutes.delete('/info/delete-user/:id',deleteUser)
userRoutes.put('/info/:id/follow',followUser)
userRoutes.put('/info/:id/unFollow',unFollowUser)

export default userRoutes
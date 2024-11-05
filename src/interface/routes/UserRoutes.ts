import { Router } from 'express'

import { OrmUserRepository } from '@infrastructure/repositories/orm/OrmUserRepository'
import { CacheHandler } from '@interfaces/cache/cacheHandler'
import { DeleteUserController } from '@interfaces/controllers/users/delete/DeleteUserController'
import { GetAllUsersController } from '@interfaces/controllers/users/get-all/GetAllUsersController'
import { GetUserByIdController } from '@interfaces/controllers/users/get-by-id/GetUserByIdController'
import { SaveUserController } from '@interfaces/controllers/users/save/SaveUserController'
import { UpdateUserController } from '@interfaces/controllers/users/update/UpdateUserController'
import { DeleteUserById } from '@use-cases/users/delete/DeleteUserById'
import { GetAllUsers } from '@use-cases/users/get-all/GetAllUsers'
import { GetUserById } from '@use-cases/users/get-by-id/GetUserById'
import { SaveUser } from '@use-cases/users/save/SaveUser'
import { UpdateUser } from '@use-cases/users/update/UpdateUser'
import { cacheClient } from 'src'
import type { DataSource } from 'typeorm'

export class UserRoutes {
	static initialize(dataSource: DataSource) {
		const router = Router()

		const userRepository = new OrmUserRepository(dataSource)
		const getAllUsers = new GetAllUsers(
			userRepository,
			CacheHandler.getInstance(cacheClient),
		)
		const getUserById = new GetUserById(userRepository)
		const saveUser = new SaveUser(userRepository)
		const updateUser = new UpdateUser(userRepository)
		const deleteUser = new DeleteUserById(userRepository)

		router.get('/', (req, res) =>
			new GetAllUsersController(getAllUsers).handle(req, res),
		)
		router.get('/:id', (req, res) =>
			new GetUserByIdController(getUserById).handle(req, res),
		)
		router.post('/', (req, res) =>
			new SaveUserController(saveUser).handle(req, res),
		)
		router.put('/:id', (req, res) =>
			new UpdateUserController(updateUser).handle(req, res),
		)
		router.delete('/:id', (req, res) =>
			new DeleteUserController(deleteUser).handle(req, res),
		)

		return router
	}
}

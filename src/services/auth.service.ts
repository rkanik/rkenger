import { fetch } from '../fetch'

const AuthApi = {
	login: (user: any) => fetch.post('/auth/login', user),
	register: (user: any) => fetch.post('/auth/register', user),
}

export { AuthApi }

import { useEffect } from 'react'
import {
	Switch,
	useHistory,
	useLocation,
	BrowserRouter,
} from 'react-router-dom'

// Wrapper
import Route from './Route'

// Layout
import Default from '../layouts/DefaultLayout'

// Pages
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'

import { useAuthContext, MessagesProvider } from '../context'
import { Test } from '../pages/Test'
import MessagesLayout from '../layouts/MessagesLayout'
import Conversation from '../pages/Conversation'

const routes = [
	{
		path: '/',
		requiresAuth: true,
	},
	{
		path: '/messages',
		requiresAuth: true,
	},
	{
		path: '/signin',
		requiresUnAuth: true,
	},
]

const Routes = () => {
	const auth = useAuthContext()
	const history = useHistory()
	const location = useLocation()

	useEffect(() => {
		const onBeforeRoutes = () => {
			const route = routes.find((route) => {
				return route.path === location.pathname
			})

			// There is no route guard
			if (!route) return

			// Ensure user is authenticated
			if (route.requiresAuth && !auth.currentUser) {
				return history.push('/signin')
			}

			// Ensure redirect to home
			if (route.requiresUnAuth && auth.currentUser) {
				return history.push('/')
			}
		}

		onBeforeRoutes()
	}, [location, auth.currentUser, history])

	return (
		<Switch>
			<Route exact path="/" component={Home} layout={Default} />
			<Route exact path="/signin" component={SignIn} layout={Default} />
			<Route exact path="/register" component={Register} layout={Default} />
			<Route exact path="/messages" layout={MessagesLayout} />
			<Route
				exact
				path="/messages/:id"
				component={Conversation}
				layout={MessagesLayout}
			/>
			<Route exact path="/test" component={Test} layout={Default} />
		</Switch>
	)
}

const Router = () => {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	)
}

export default Router

import { BrowserRouter, Switch } from 'react-router-dom'

// Wrapper
import Route from './Route'

// Layout
import Default from '../layouts/DefaultLayout'

// Pages
import Home from '../pages/Home'
import { MessagesProvider } from '../context/MessagesContext'

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact path='/'
					component={Home}
					layout={Default}
				/>
				<Route
					exact path='/messages'
					component={MessagesProvider}
					layout={Default}
				/>
			</Switch>
		</BrowserRouter>
	)
}

export default Router
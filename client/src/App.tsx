import { AuthProvider } from './context/AuthContext';
import { GlobalProvider } from './context/GlobalContext';
import Router from './router/Router'

function App() {
	return (
		<div id='app'>
			<GlobalProvider>
				<AuthProvider >
						<Router />
				</AuthProvider>
			</GlobalProvider>
		</div>
	);
}

export default App;

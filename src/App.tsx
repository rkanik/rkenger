import Router from './router/Router'

import { GlobalProvider } from './context/GlobalContext'
import { AuthProvider, ConversationProvider } from './context'
import { MessageProvider } from './context/providers'

function App() {
	return (
		<div id="app">
			<GlobalProvider>
				<AuthProvider>
					<ConversationProvider>
						<MessageProvider>
							<Router />
						</MessageProvider>
					</ConversationProvider>
				</AuthProvider>
			</GlobalProvider>
		</div>
	)
}

export default App

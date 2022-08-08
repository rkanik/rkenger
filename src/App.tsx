import Router from './router/Router'

import { GlobalProvider } from './context/GlobalContext'
import { AuthProvider, ConversationProvider } from './context'
import { MessageProvider } from './context/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
	return (
		<div id="app">
			<QueryClientProvider client={new QueryClient()}>
				<GlobalProvider>
					<AuthProvider>
						<ConversationProvider>
							<MessageProvider>
								<Router />
							</MessageProvider>
						</ConversationProvider>
					</AuthProvider>
				</GlobalProvider>
			</QueryClientProvider>
		</div>
	)
}

export default App

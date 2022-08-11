import Router from './router/Router'

import { GlobalProvider } from './context/GlobalContext'
import { MessageProvider } from './context/providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider, ConversationProvider, SocketProvider } from './context'

function App() {
	return (
		<div id="app">
			<QueryClientProvider client={new QueryClient()}>
				<GlobalProvider>
					<AuthProvider>
						<SocketProvider>
							<ConversationProvider>
								<MessageProvider>
									<Router />
								</MessageProvider>
							</ConversationProvider>
						</SocketProvider>
					</AuthProvider>
				</GlobalProvider>
			</QueryClientProvider>
		</div>
	)
}

export default App

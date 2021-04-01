import Sidebar from "../components/Sidebar"

interface Props { }

const MessagesLayout: React.FC<Props> = ({ }) => {
	return (
		<div className="flex h-screen">
			<Sidebar />
		</div>
	)
}

export default MessagesLayout
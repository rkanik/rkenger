import { IconButton } from '../utils/Button'

import Dropdown from '../utils/Dropdown'
import ProfileMenu from '../ProfileMenu'
import ProfileMenuToggler from '../ProfileMenuToggler'

import type { GlobalContextType, User } from '../../context/types'
import { useContext } from 'react'
import { useAuthContext } from '../../context'
import { GlobalContext } from '../../context/GlobalContext'
import { useHistory } from 'react-router-dom'

const ConversationActionsHeader: React.FC = () => {
	const history = useHistory()

	// LEGACY
	const $state = useContext(GlobalContext) as GlobalContextType
	const $auth = useAuthContext()

	const handleSignOut = () => {
		$auth.resetState()
		history.replace('/')
	}

	const handleChangeTheme = () => {
		$state.setState({
			theme: {
				isDark: !$state.theme.isDark,
			},
		})
	}

	return (
		<div className="w-72 p-4 flex items-center justify-end">
			<IconButton
				md={$state.theme.isDark ? 'brightness_4' : 'wb_sunny'}
				onClick={handleChangeTheme}
			/>
			<Dropdown
				className="shadow-md top-full right-0"
				toggler={(onClick: () => void) => (
					<ProfileMenuToggler
						onClick={onClick}
						name={$auth.currentUser?.name as string}
						src={$auth.currentUser?.thumbnail as string}
						className="ml-2"
					/>
				)}
			>
				<ProfileMenu
					user={$auth.currentUser as User}
					signOut={handleSignOut}
				/>
			</Dropdown>
		</div>
	)
}

export { ConversationActionsHeader }

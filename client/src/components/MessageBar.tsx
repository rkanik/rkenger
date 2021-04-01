import React, { useRef } from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { useForm } from 'react-hook-form';
import { _buttonTypes } from '../enums';
import Button, { IconButton } from './utils/Button';
import Dropdown from './utils/Dropdown';
import { toImageBase64 } from '../helpers';
import axios from 'axios';

type Props = {
	onMessage?: (message: string) => void
}
const MessageBar: React.FC<Props> = ({ onMessage }) => {

	const imgChooseEl = useRef<HTMLInputElement>(null)

	const [isMessageEmpty, setIsMessageEmpty] = React.useState(true)
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = (data: any) => {
		if (onMessage) {
			onMessage(data.message)
			reset({ message: '' })
		}
	};

	const onChooseEmo = (data: any) => {
		console.log(data)
	}

	const handleChooseImage = () => {
		imgChooseEl.current?.click()
	}

	const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (!files?.length) return
		toImageBase64(files, (_, file) => {
			let form = new FormData();
			form.append("image", file)
			axios.post(
				`${process.env.REACT_APP_IMGBB_API_URL
				}?expiration=0&key=${process.env.REACT_APP_IMGBB_API_KEY
				}`, form).then(res => {
					console.log(JSON.stringify(res.data))
				})
		})
	}

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		setIsMessageEmpty((e.target as HTMLTextAreaElement).value === '')
	}

	return (
		<form 
			onSubmit={handleSubmit(onSubmit)} 
			className='flex-none p-4 border-t border-gray-200 dark:border-gray-800 flex items-center space-x-2'>

			<input
				multiple
				type="file"
				accept='image/*'
				className='hidden'
				ref={imgChooseEl}
				onChange={handleUploadImage}
			/>

			<IconButton feather="video" />
			<IconButton feather="camera" />
			<IconButton onClick={handleChooseImage} feather="image" />
			<IconButton feather="paperclip" />

			<div className='flex-1'>
				<input
					type="text"
					name="message"
					autoComplete="off"
					placeholder='Type your message'
					className='w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-base'
					onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(e)}
					ref={register({ required: true })}
				/>
			</div>

			<Dropdown
				className='top-auto bottom-full right-0'
				toggler={(onClick: () => void) =>
					<IconButton
						feather="smile"
						onClick={onClick}
					/>
				}
			>
				<Picker
					onEmojiClick={onChooseEmo}
					disableAutoFocus={true}
					skinTone={SKIN_TONE_MEDIUM_DARK}
					groupNames={{ smileys_people: "PEOPLE" }}
					native
				/>
			</Dropdown>

			{isMessageEmpty
				? <IconButton feather="thumbs-up" />
				: <IconButton feather="send" type={_buttonTypes.submit} />
			}
		</form>
	)
}
export default MessageBar
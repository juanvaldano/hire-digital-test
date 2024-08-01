import { useState, useId, useEffect } from 'react'
import { MAX_FILE_SIZE_ALLOWED, API_CALL_STATE } from '../constants'
import { Button, Dialog, Spinner, Text } from '@radix-ui/themes'
import { FileError } from '../interfaces'
import * as Form from '@radix-ui/react-form';

const UploadForm = () => {
	const fileInputId = useId()

	const [file, setFile] = useState<File | null>(null)
	const [error, setError] = useState<FileError | null>(null)
	const [requestState, setRequestState] = useState(API_CALL_STATE.IDLE)

	const handleSubmit = async (event: React.FormEvent) => {
		setRequestState(API_CALL_STATE.LOADING)

		event.preventDefault()

		if(file && file.size > MAX_FILE_SIZE_ALLOWED) {
			setError({
				title: 'File too big',
				description: "The file you're trying to upload exceeds 5MB. Try uploading a smaller file"
			})
			setRequestState(API_CALL_STATE.IDLE)
			return
		}

		const formData = new FormData()
		formData.append('file', file as Blob)

		try {
			const response = await fetch('/api/file', {
				method: 'POST',
				body: formData
			})
			setRequestState(API_CALL_STATE.IDLE)
		} catch (error: any) {
			setRequestState(API_CALL_STATE.ERROR)
			throw new Error(error.message)
		}
	}

	useEffect(() => {
		setError(null)
	}, [file])

	return (
		<>
			<Form.Root onSubmit={handleSubmit} className="w-4/5 flex flex-col gap-[1rem]">
				<label htmlFor={fileInputId}>{'Upload your images, videos and more!'}</label>
				<input
					type='file'
					id={fileInputId}
					onChange={event => setFile(event.target.files?.item(0) || null)}
				/>
				<Dialog.Root>
					<Dialog.Trigger>
						<Button type='submit'>
							{
								requestState === API_CALL_STATE.LOADING
									? <Spinner />
									: <Text>Upload</Text>
							}
						</Button>
					</Dialog.Trigger>

					{
						error &&
						<Dialog.Content maxWidth="450px">
							<Dialog.Title>{ error.title }</Dialog.Title>
							<Dialog.Description size="2" mb="4">
								{ error.description }
							</Dialog.Description>

							<Dialog.Close>
								<Button>Close</Button>
							</Dialog.Close>
						</Dialog.Content>
					}
				</Dialog.Root>
			</Form.Root>
		</>
	)
}

export default UploadForm

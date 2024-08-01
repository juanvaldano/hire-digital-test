import { useState, useId } from 'react'

const UploadForm = () => {
	const fileInputId = useId()

	const [file, setFile] = useState<File | null>(null)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		
		const formData = new FormData()
		formData.append('file', file as Blob)

		await fetch('/api/file', {
			method: 'POST',
			body: formData
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor={fileInputId}>{'<=5MB files only'}</label>
			<input
				type='file'
				id={fileInputId}
				onChange={event => setFile(event.target.files?.item(0) || null)}
			/>
			<button type='submit'>Upload</button>
		</form>
	)
}

export default UploadForm

import { Pencil1Icon } from "@radix-ui/react-icons"
import { Button, Dialog, Flex, IconButton, Spinner } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { useState, useId } from "react"

const ModifyButton = ({ fromUrl }: { fromUrl: string }) => {
	const [name, setName] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const nameInputId = useId()

	const router = useRouter()

	const handleClick = async () => {
		setIsLoading(true)

		const formData = new FormData()
		formData.append('fromUrl', fromUrl)
		formData.append('toPathname', name)

		try {
			await fetch('/api/file', {
				method: 'PUT',
				body: formData
			})
		} catch (error: any) {
			throw new Error(error.message)
		}
		
		try {
			await fetch(`/api/file/${encodeURIComponent(fromUrl)}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application-json'
				}
			})
		} catch (error: any) {
			throw new Error(error.message)
		}

		router.refresh()

		setIsLoading(false)
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<IconButton>
					{
						isLoading
							? <Spinner />
							: <Pencil1Icon width='18' height='18' />
					}
				</IconButton>
			</Dialog.Trigger>
			<Dialog.Content maxWidth="450px">
				<Dialog.Title>File Name Editor</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Enter the new name you wish for your file to have
				</Dialog.Description>

				<Flex direction='column' gap='2' mb='16px'>
					<fieldset className="flex gap-2">
						<label className="Label" htmlFor={nameInputId}>
							New file name
						</label>
						<input
							className="border-2 border-black rounded-md"
							id={nameInputId}
							onChange={event => setName(event.target.value)} />
					</fieldset>
				</Flex>

				<Flex gap='2' justify='end'>
					<Dialog.Close>
						<Button>Close</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button onClick={handleClick}>Save Changes</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	)
}

export default ModifyButton

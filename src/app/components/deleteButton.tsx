'use client'

import { TrashIcon } from "@radix-ui/react-icons"
import { IconButton, Spinner } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { useState } from "react"

const DeleteButton = ({ url }: { url: string }) => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleClick = async () => {
		setIsLoading(true)
		try { 
			await fetch(`/api/file/${encodeURIComponent(url)}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application-json'
				}
			})

			router.refresh()
		} catch (error: any) {
			throw new Error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<IconButton onClick={handleClick}>
			{
				isLoading
					? <Spinner />
					: <TrashIcon width='18' height='18' />
			}
		</IconButton>
	)
}

export default DeleteButton

'use client'

import { Flex, Link, Skeleton, Text } from "@radix-ui/themes"
import DeleteButton from "./deleteButton"
import ModifyButton from "./modifyButton"
import { useEffect, useState } from "react"

const Blobs = ({ blobs }) => {
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setIsReady(true)
		}, 2000);
	}, [])

	if(!blobs || !isReady) {
		const array = new Array(10).fill('')

		return (
			<Flex direction={'column'} gap='2'>
				{
					array.map((_, index) => <Skeleton key={index} width='200px' height='25px'/>)
				}
			</Flex>
		)
	}

	return (
		<ul>
			<Flex direction={'column'} gap='2'>
				{
					blobs.map((blob) => (
						<li key={`${blob.pathname}-${blob.uploadedAt}`}>
							<Flex gap='1'>
								<Link href={blob.url} target='_blank'>
									<Text>{blob.pathname}</Text>
								</Link>
								<DeleteButton url={blob.url} />
								<ModifyButton fromUrl={blob.url} />
								<Link href={blob.downloadUrl}>Download</Link>
							</Flex>
						</li>
					))
				}
			</Flex>
		</ul>
	)
}

export default Blobs

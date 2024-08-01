import { list } from '@vercel/blob'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton, Flex, Link, Text, Heading, Separator } from '@radix-ui/themes'
import DeleteButton from '../components/deleteButton'

const AllBlobs = async () => {
	const blobs = await list()

	return (
			<section>
				<Heading>Files</Heading>
				<Separator my='4' size='4' />
				<ul>
					<Flex direction={'column'} gap='2'>
						{
							blobs.blobs.map(blob => (
								<li key={`${blob.pathname}-${blob.uploadedAt}`}>
									<Flex gap='1'>
										<Link href={blob.url} target='_blank'>
											<Text>{blob.pathname}</Text>
										</Link>
										<IconButton>
											<Pencil1Icon width='18' height='18' />
										</IconButton>
										<DeleteButton url={blob.url} />
									</Flex>
								</li>
							))
						}
					</Flex>
				</ul>
			</section>
	)
}

export default AllBlobs

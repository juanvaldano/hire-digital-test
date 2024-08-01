import { list } from '@vercel/blob'
import { Heading, Separator } from '@radix-ui/themes'
import Blobs from '../components/blobs'

const AllBlobs = async () => {
	const blobs = await list()

	return (
		<section>
			<Heading>Files</Heading>
			<Separator my='4' size='4' />
			<Blobs blobs={blobs.blobs} />
		</section>
	)
}

export default AllBlobs

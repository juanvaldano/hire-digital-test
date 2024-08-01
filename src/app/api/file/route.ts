import { put, copy, head } from "@vercel/blob"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
	const form = await req.formData()
	const file = form.get('file') as File

	if(!file.name) {
		return NextResponse.json(
			{ error: 'No file provided'},
			{ status: 400 }
		)
	}

	const blob = await put(file.name, file, { access: 'public' })

	return NextResponse.json(blob)
}
 
export async function PUT(request: Request) {
  const form = await request.formData()

  const toPathname = form.get('toPathname') as string
  const fromUrl = form.get('fromUrl') as string

  const blobDetails = await head(fromUrl);

  const blob = await copy(fromUrl, toPathname, { access: 'public', contentType: blobDetails.contentType })
 
  return NextResponse.json(blob)
}

import { del } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (req: NextRequest, context: any) => {
	const { params } = context
	let { url } = params
	url = decodeURIComponent(url) 

	if(!url) {
		return NextResponse.json(
			{ error: 'No url provided' },
			{ status: 400 }
		)
	}

	await del(url)
	return NextResponse.json({ success: true })
}

export const PUT = async (req: NextRequest, context: any) => {
	const { params } = context
	let { url } = params
	url = decodeURIComponent(url) 
}

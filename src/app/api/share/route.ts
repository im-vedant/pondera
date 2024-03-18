import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

import { db } from '@/db'
import { share } from '@/db/schema'

export async function POST(request: Request) {
  try {
    const { model, name, list } = await request.json()
    if (!list?.length) {
      return NextResponse.json(
        { code: -1, msg: 'list cannot be empty' },
        { status: 500 },
      )
    }
    const id = nanoid()
    const deleteId = nanoid()

    await db.insert(share).values({
      id,
      model,
      name,
      list,
      deleteId,
    })

    return NextResponse.json({
      code: 0,
      msg: 'success',
      data: { id, deleteId },
    })
  } catch (error: any) {
    console.log(error, 'create tokens error')
    return NextResponse.json(
      { code: -1, msg: error.message || 'create tokens error' },
      { status: 500 },
    )
  }
}
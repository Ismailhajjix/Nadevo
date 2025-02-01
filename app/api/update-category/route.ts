import { updateParticipantCategory } from '@/lib/supabase/updateCategory'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const result = await updateParticipantCategory()
    return NextResponse.json({ message: 'Category updated successfully', data: result })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
} 
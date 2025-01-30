import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function updateParticipantCategory() {
  try {
    const { data, error } = await supabase
      .from('participants')
      .update({ category_id: 'cat1' })
      .eq('name', 'حسين ترك')
      .select()

    if (error) {
      console.error('Error updating category:', error)
      throw error
    }

    console.log('Successfully moved حسين ترك to Creators category:', data)
    return data
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
} 
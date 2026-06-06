import { createClient } from '@supabase/supabase-js'

const url = 'https://cmszpqyfkumopmbkpoqe.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtc3pwcXlma3Vtb3BtYmtwb3FlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDk4NDcxNCwiZXhwIjoyMDkwNTYwNzE0fQ.bL8eRuf18BpvSe7nBK3S8OGBJ6aY7c9XHV4nO_8Tvec'

const supabase = createClient(url, key)

async function test() {
  const { data, error } = await supabase.from('companies').select('*').limit(1)
  console.log('Query Error:', error)
  console.log('Query Data:', data)
  
  const { error: insertError } = await supabase.from('companies').insert({
    name: 'Test Setup Company',
    stripe_plan: 'free',
    status: 'pending'
  })
  console.log('Insert Error:', insertError)
}

test()

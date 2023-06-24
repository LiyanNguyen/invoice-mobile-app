import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_API_KEY } from "@env"

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)

export default supabase
import { createClient } from '@supabase/supabase-js'

// PASTE YOUR ACTUAL URL AND KEY INSIDE THE QUOTES BELOW
const SUPABASE_URL = "https://sjdqxjpcnqptuqrsqway.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqZHF4anBjbnFwdHVxcnNxd2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMTkwNTAsImV4cCI6MjA4MTc5NTA1MH0.eBUO5meWTwfC56_Eth3hD5EHODhbnxnZbI4PzHpzxxc"; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
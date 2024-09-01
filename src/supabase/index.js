import { createClient } from '@supabase/supabase-js'



export const  supabase = createClient(
    'https://vtgoxryaksupylggnhhs.supabase.co/',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Z294cnlha3N1cHlsZ2duaGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2NzQ0MzEsImV4cCI6MjA0MDI1MDQzMX0.ydnIF2ZtR0HkdEWXLpwPl6RA2HA8tZ7yBghhqEurDgw'
)
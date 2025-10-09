import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jcszwdvvcbqltenifavk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjc3p3ZHZ2Y2JxbHRlbmlmYXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzk5NDksImV4cCI6MjA3MzUxNTk0OX0.MwLPtnvZb8mwS9xQlwTok62C5IMb9Nx2Q4VSfaZM4NY";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

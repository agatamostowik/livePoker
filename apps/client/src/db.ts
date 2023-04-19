import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://skktkvqhktbourpsrgch.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNra3RrdnFoa3Rib3VycHNyZ2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0MDkyNzEsImV4cCI6MTk5Njk4NTI3MX0.JqbSOzgCZr-3coiY3g4EdRFfadEzNH5Szn08dOCPnfs"
);

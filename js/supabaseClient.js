import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/supabase.min.js';

// Reemplaza [YOUR_PASSWORD] por tu contraseña real
const SUPABASE_URL = 'https://sjvgfhloimgzdheiqnuj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdmdmaGxvaW1nemRoZWlxbnVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMDg0OTIsImV4cCI6MjA3NjU4NDQ5Mn0.ieXM9A9sw4a0uOnzvHQ887xyb8gY_G_OvAsGM8I2tIs'; // para lectura pública, no uses SERVICE_ROLE en frontend

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;

import { initApp } from "./src/app";
import { webSocket } from "./src/webSocket";

declare global {
  namespace Express {
    export interface User {
      id: string;
      password: string;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_API_KEY: string;
    }
  }
}

export const origin = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "https://livepoker-production.up.railway.app",
];
const port = process.env.PORT || 3001;

// Express Server
export const app = initApp();
// Socket.IO Server
export const io = webSocket(app);

app.listen(port, () => {
  console.log(`Express & WebSocket Server: http://localhost:${port}/`);
});

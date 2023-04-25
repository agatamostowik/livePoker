import { initApp } from "./src/app";
import { webSocket } from "./src/webSocket";
import { PeerServer } from "peer";

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

const port = process.env.PORT || 3001;
export const app = initApp();
export const io = webSocket(app);
export const peerServer = PeerServer({
  port: 9000,
  path: "/peerjs",
  corsOptions: {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  },
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

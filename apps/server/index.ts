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

const port = process.env.PORT || 3001;
export const app = initApp();
export const io = webSocket(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

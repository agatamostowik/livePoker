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
      PGPORT: number;
      PGUSER: string;
      PGPASSWORD: string;
      PGHOST: string;
      DATABASE: string;
    }
  }
}

const port = process.env.PORT || 3001;
const app = initApp();

webSocket(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

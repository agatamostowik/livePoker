import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ExpressPeerServer } from "peer";

const app = express();
const port = process.env.PORT || 443;

const origin = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "https://livepoker-production.up.railway.app",
];

app.use(
  cors({
    origin,
    credentials: true,
  })
);
app.use(bodyParser.json());

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server);

app.use("/peerjs", peerServer);

server.listen(port, () => {
  console.log(`Peer-Server: http://localhost:${port}/`);
});

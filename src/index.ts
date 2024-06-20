require('dotenv').config();
import { bus } from "./infrastrucre/bus";
import { runServer } from "./infrastrucre/express/runServer";

const listenForSigInt = () => {
  process.once('SIGINT', async () => {
    console.log('Received SIGINT, shutting down...')
    if (bus) {
      await bus.dispose();
      console.log('bus stoped');
    }
    process.abort()
  })
}

listenForSigInt()
runServer().catch();
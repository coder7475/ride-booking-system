import { Router } from "./Router.js";
import { Server } from "./server.js";

// export class Framework {
//   server: Server;
//   constructor() {
//     this.server = new Server();
//   }

//   // methods
//   get() {}

//   post() {}

//   listen(port: number, cb?: () => void) {
//     this.server.listen(port, cb);
//   }
// }

export const createApp = () => new Server();
// console.log(router.toString());

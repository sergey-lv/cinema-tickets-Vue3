const socket = new WebSocket("ws://localhost:3000");

let listens = [] as Array<(param: string) => void>;

// socket.addEventListener("open", () => {
//   socket.send("connect");
// });

socket.addEventListener("message", (msg) => {
  const data = JSON.parse(msg.data);
  listens.forEach((fn) => fn(data.method));
});

export function subscribeToUpdate(cb: (param: string) => void) {
  listens.push(cb);
}

export function unsubscribeFromUpdate() {
  listens = [];
}

export function socketSendMessage(message: { method: string }) {
  const msg = JSON.stringify(message);
  socket.send(msg);
}
import {serve} from "bun";

serve({
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response("Hello from bun Alex", { status: 200 });
    } else if (url.pathname === "/ice-tea") {
      return new Response("Ice tea", { status: 200 });
    } else {
      return new Response("404 Not Found", { status: 404 });
    }
  },

  port: 3000,
  hostname: "127.0.0.1",
})






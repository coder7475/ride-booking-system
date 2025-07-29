import { createApp } from "@repo/framework";

const app = createApp();

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use((req, res, next) => {
  console.log("Second Global Middleware");
  next();
});

app.get("/", [], (req, res) => {
  res.status(200).json({
    message: "Home Route",
  });
});

app.get(
  "/about",
  [
    (req, res, next) => {
      console.log("about middleware");
      next();
    },
  ],
  (req, res) => {
    res.status(200).json({
      message: "About Route",
    });
  },
);
// events
// app.on("request:received", () => {
//   console.log("Server Request Received!");
// });

// app.on("request:processed", () => {
//   console.log("Server Request Processed!");
// });
// listener
const port = 5555;
app.listen(port, () => {
  console.log(`Server is Running on port http://localhost:${port}!`);
});

// add to router
// router.add("GET", "/", () => {});
// router.add("GET", "/home", () => {});
// router.add("POST", "/login", () => {});
// router.add("GET", "/admin/dashboard", () => {});
// router.add("GET", "/products/:id", () => {});
// router.add("GET", "/products/:id/comments/:cid", () => {});

// const startTime = performance.now();
// console.log(router.toString());
// const endTime = performance.now();
// console.log(`Time Taken: ${endTime - startTime}`);

// const routesToTest = [
//   { method: "GET", path: "/home" },
//   { method: "GET", path: "/admin/dashboard" },
//   { method: "GET", path: "/products/1243" },
//   { method: "GET", path: "/products/1243/comments/5632" },
// ];

// for (const { method, path } of routesToTest) {
//   const start = performance.now();
//   // Cast method to the correct type if necessary
//   const result = router.match(method as any, path);
//   const end = performance.now();
//   console.log(`Route: [${method}] ${path}`);
//   console.log("Match Result:", result);
//   console.log(`Time Taken: ${end - start}ms\n`);
// }

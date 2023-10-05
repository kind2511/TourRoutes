const http = require("http");

// Creating a simple web server
// http.createServer takes in a callback function which will be fired of each time a new request hits the server.
const server = http.createServer((req, res) => {
    const pathName = req.url;
  
    // Routing: Implementing differnt actions for different urls.
    // Simple routing
    if (pathName === "/" || pathName === "/first") {
      res.end("Home page");
    } else if (pathName === "/second") {
      res.end("Second page");
    } else {
      res.writeHead(404, {
        "content-type": "text/html", // Gives us the ability to render message/ status code as html on page
      });
      res.end("<h1>Page not found!</h1>");
    }
  });
  
  // Listen to incoming requests from clients
  server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
  });
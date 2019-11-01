const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Page</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302;
        //res.setHeader('Location', '/');
        console.log("Second");
        return res.end(); // it just registers this callback, but doesn`t exit the whole funciton of server and it will be called sometime in the future - NOT NOW!
      });
    });
  }
  //res.setHeader('Content-Type','text/html');
  // it continues to be executed
  console.log("First");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my Node.js</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
//exports = requestHandler;

const http = require("http");
const fs = require("fs");
const readline = require("readline");

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let jsContent = "";
let styleContent = "";

fs.readFile("home.html", function (err, home) {
  if (err) throw err;
  homeContent = home;
});

fs.readFile("project.html", function (err, project) {
  if (err) throw err;
  projectContent = project;
});

fs.readFile("registration.html", function (err, registration) {
  if (err) throw err;
  registrationContent = registration;
});

fs.readFile("script.js", function (err, script) {
  if (err) throw err;
  jsContent = script;
});

fs.readFile("style.css", function (err, style) {
  if (err) throw err;
  styleContent = style;
});

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineDetail.question(
  `Please provide file path for registration form (registration.html) - `,
  (path) => {
    http
      .createServer(function (request, response) {
        let url = request.url;
        response.writeHeader(200, { "Content-Type": "text/html" });
        switch (url) {
          case "/project":
            response.write(projectContent);
            response.end();
            break;
          case "/registration":
            response.write(registrationContent);
            response.end();
            break;
          case "/script.js":
            response.write(jsContent);
            response.end();
            break;
          case "/style.css":
            response.writeHeader(200, { "Content-Type": "text/css" });
            response.write(styleContent);
            response.end();
            break;
          default:
            response.write(homeContent);
            response.end();
            break;
        }
      })
      .listen(3000);
    lineDetail.close();
  }
);

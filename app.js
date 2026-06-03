const http = require("http");

const {getUser} = require("./controllers/usercontroller");

const server = http.createServer((req, res) => {

    if (req.url === "/user/1") {
        getUser(req, res, 1);
    }

    else if (req.url === "/user/2") {
        getUser(req, res, 2);
    }

    else {
        res.writeHead(404);
        res.end("Route Not Found");
    }

});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});
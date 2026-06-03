const { getUserById } = require("../service/userservice");
const { renderUser } = require("../views/userview");

function getUser(req, res, id) {

    const user = getUserById(id);

    if (!user) {
        res.writeHead(404);
        res.end("User Not Found");
        return;
    }

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(renderUser(user));
}

module.exports = { getUser };
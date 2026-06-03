const {users} = require('../models/usermodel');

function getUserById(id) {
    return users.find(user => user.id == id);
}   

module.exports = { getUserById };
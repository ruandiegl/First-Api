
let users = require("../mocks/users");

module.exports = {
    listusers(request, response) {
        const { order } = request.query;
        const sortedUsers = users.sort((a, b) => {
            if (order === "desc") {
                return a.id < b.id ? 1 : -1;
            }
            return a.id > b.id ? 1 : -1;
        });
        response.send(200, sortedUsers);
    },

    getUserById(request, response) {
        const { id } = request.params;

        const user = users.find((user) => user.id === Number(id));

        if (!user) {
            return response.send(400, { error: "User not found" });
        }
        response.send(200, user);
    },

    createUser(request, response) {
        const { body } = request;

        const lastUserId = users[users.length - 1].id;
        const newUser = {
            id: lastUserId + 1,
            name: body.name,
        };
        users.push(newUser);

        response.send(200, newUser);
    },

    updateUser(request, response) {
        let { id } = request.params;
        const { name } = request.body;
        const parseid = Number(id);

        const userExist = users.find((user) => user.id === parseid);
        if (!userExist) {
            //console.log(request)
            //   console.log(request.params);
            //   console.log(users);
            //   console.log("Received ID:", id);
            //   console.log("Received Name:", name);
            return response.send(400, { error: "User not found" });
        }

        const target = users.findIndex((item) => {
            return item.id === parseid;
        });

        const mirror = [...users];

        mirror[target].name = name;

        users = mirror;

        // console.log("Received ID:", id);
        // console.log("Received Name:", name);

        // users = users.map((user) => {
        //   if (user.id === id) {
        //     return {
        //       ...user,
        //       name,
        //     };
        //   }
        //   return user;
        // });

        response.send(200, { id, name });
    },
    deleteUser(request,response){
        const {id} = request.params
        const parseid = Number(id);

        users= users.filter((user) => user.id !== parseid);
        response.send(200, { deleted: true });

    },
};
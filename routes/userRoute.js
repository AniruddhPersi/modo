const controller = require("../controllers/userController")

module.exports = (app) => {
    app.use((req,res,next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/v1/user/create-user", controller.createUser);
    app.get("/api/v1/user/get-form", controller.getForm);
    app.get("/api/v1/user/get-user", controller.findUserDetails);
    // app.get("/api/v1/user/get-all-user", controller.findAllUser);



}
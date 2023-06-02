const controller = require("../controllers/taskCheckListController")

module.exports = (app) => {
    app.use((req,res,next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/v1/task/create-task", controller.createUserTask);
    app.post("/api/v1/task/update-task-status", controller.changeTaskStatus);
    app.get("/api/v1/task/get-current-task", controller.getAllCurrentTask);
    app.get("/api/v1/task/get-current-task-two", controller.getAllCurrentTaskTwo);
    app.get("/api/v1/task/get-completed-task", controller.getAllCompletedTask);
    app.get("/api/v1/task/get-completed-task-two", controller.getAllCompletedTaskTwo);



}
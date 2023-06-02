const TaskList = require("../models/taskChecklistModel");



exports.createUserTask = async (req,res) => {
    try {
        const task = await TaskList.create({
            user_id: req.body.user_id,
            title: req.body.title,
            description: req.body.description,
            buttonElement: {
                "elementType": "buttonContainer",
                "buttons": [
                    {
                        "elementType": "linkButton",
                        "link": {
                            "external": "https://www.example.com"
                        },
                        "title": "Perform Task"
                    },
                    {
                        "elementType": "linkButton",
                        "accessoryIcon": "confirm",
                        "title": "Mark Completed",
                        "accessoryIconPosition": "left",
                        "confirmationMessage": "Task is Completed"
                    }
                ]
            }

        })
        res
        .status(200)
        .json({
            statusCode: 200,
            status: true, 
            message: "Task Created Successfully!",
            data: task 
        })
    } catch (err) {
        res
        .status(500)
        .json({
            statusCode: 500,
            status: false,
            message: err.message
        })
    }
};

exports.getAllCurrentTask = async (req,res) => {
    try {
        const currentTaskList = await TaskList.find({is_completed: false});
        res
        .status(200)
        .json({
            statusCode: 200,
            status: true, 
            message: "Current Task List!",
            data: currentTaskList 
        })
    } catch (err) {
        res
        .status(500)
        .json({
            statusCode: 500,
            status: false,
            message: err.message
        })
    }
};

exports.getAllCurrentTaskTwo = async (req,res) => {
    try {
        const currentTaskList = await TaskList.find({is_completed: false});
        let taskList = []
        for(let i = 0 ; i < currentTaskList.length; i++) {
            let task_list = Object.assign({},{
                "elementType": "collapsible",
                "id": currentTaskList[i]._id,
                "collapsed": true,
                "title": currentTaskList[i].title,
                "showTitleBottomBorder": false,
                "content": [
                    {
                        "elementType": "detail",
                        "body": currentTaskList[i].description
                    },
                    currentTaskList[i].buttonElement
                ]
            })
           taskList.push(task_list)
        };
        let task_list2 = Object.assign({},{
            "metadata":
                { "version": "1" },
            "regionContent": taskList
        });

        res
        .json(task_list2)
    } catch (err) {
        res
        .status(500)
        .json({
            statusCode: 500,
            status: false,
            message: err.message
        })
    }
};

exports.getAllCompletedTask = async (req,res) => {
    try {
        const completedTaskList = await TaskList.find({is_completed: true});
        res
        .status(200)
        .json({
            statusCode: 200,
            status: true, 
            message: "Completed Task List!",
            data: completedTaskList 
        })
    } catch (err) {
        res
        .status(500)
        .json({
            statusCode: 500,
            status: false,
            message: err.message
        })
    }
};

exports.getAllCompletedTaskTwo = async (req,res) => {
    try {
        const completedTaskList = await TaskList.find({is_completed: true});
        let taskList = []
        for(let i = 0 ; i < completedTaskList.length; i++) {
            let task_list = Object.assign({},{
                "elementType": "collapsible",
                "id": completedTaskList[i]._id,
                "collapsed": true,
                "title": completedTaskList[i].title,
                "showTitleBottomBorder": false,
                "content": [
                    {
                        "elementType": "detail",
                        "body": completedTaskList[i].description
                    },
                    completedTaskList[i].buttonElement
                ]
            })
           taskList.push(task_list)
        };
        let task_list2 = Object.assign({},{
            "metadata":
                { "version": "1" },
            "regionContent": taskList
        });
        res
        .json(task_list2)
    } catch (err) {
        res
        .status(500)
        .json({
            statusCode: 500,
            status: false,
            message: err.message
        })
    }
};

exports.changeTaskStatus = async (req,res) => {
    console.log(req.body);
    try {
        if(req.body.is_completed == true) {
            const updatedTaskStatus = await TaskList.findByIdAndUpdate(req.body.taskId,{
                is_completed: req.body.is_completed,
                buttonElement: {
                    "elementType": "buttonContainer",
                    "buttons": [
                        {
                            "elementType": "linkButton",
                            "link": {
                                "external": "https://www.example.com"
                            },
                            "accessoryIcon": "inspect",
                            "accessoryIconPosition": "left",
                            "title": "Review Task"
                        },
                        {
                            "elementType": "linkButton",
                            "accessoryIcon": "cancel",
                            "title": "Mark as not Completed",
                            "accessoryIconPosition": "left",
                            "confirmationMessage": "Task move to the Current Tasks list"
                        }
                    ]
                }
            });
        } else {
            const updatedTaskStatus = await TaskList.findByIdAndUpdate(req.body.taskId,{
                is_completed: req.body.is_completed,
                buttonElement: {
                    "elementType": "buttonContainer",
                    "buttons": [
                        {
                            "elementType": "linkButton",
                            "link": {
                                "external": "https://www.example.com"
                            },
                            "title": "Perform Task"
                        },
                        {
                            "elementType": "linkButton",
                            "accessoryIcon": "confirm",
                            "title": "Mark Completed",
                            "accessoryIconPosition": "left",
                            "confirmationMessage": "Task is Completed"
                        }
                    ]
                }
            });
        }
        res
        .status(200)
        .json({
            statusCode: 200,
            status: true, 
            message: `Task status changed successfully to ${req.body.is_completed}.`,
        })
    } catch (err) {
        console.log("err",err);
        res
        .status(500)
        .json({
            statusCode: 500,
            status: false,
            message: err.message
        })
    }
}


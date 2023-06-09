const User = require("../models/userModel");

exports.createUser = async (req,res) => {
    try {
        const user  = await User.create({
            name: req.body.name,
        });
        let x = Object.assign({},{
            "metadata": {
                "version": "2.0"
              },
              "content": [
                {
                  "elementType": "heading",
                  "title": "Form receipt"
                },
                {
                  "elementType": "table",
                  "columnOptions": [
                    {
                      "header": "Name",
                      "width": "25%"
                    },
                    {
                      "header": "Value"
                    }
                  ],
                  "rows": [
                    {
                      "cells": [
                        {
                            "title": "Name",
                        },
                        {
                            "title": user.name,
                        }
                      ]
                    }
                  ]
                }
              ]
        })
        res
        .json(x)
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

exports.getForm = async (req, res) => {
    const relativePath = req.query.path
    try {
        const form = {
            "metadata": {
                "version": "2.0"
            },
            "content": [
                {
                    "elementType": "form",
                    "heading": "Form heading",
                    "requestMethod": "GET",
                    "relativePath": relativePath,
                    "items": [
                        {
                            "elementType": "input",
                            "inputType": "hidden",
                            "name": "example",
                            "value": "get_based_form"
                        },
                        {
                            "elementType": "input",
                            "inputType": "text",
                            "name": "Name",
                            "label": "Name",
                            "required": true
                        },
                        {
                            "elementType": "buttonContainer",
                            "buttons": [
                                {
                                    "elementType": "formButton",
                                    "title": "Submit",
                                    "buttonType": "submit",
                                    "actionType": "constructive"
                                },
                                {
                                    "elementType": "formButton",
                                    "title": "Reset",
                                    "buttonType": "reset",
                                    "actionType": "destructive"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        res
        .json(form)
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


// exports.findAllUser = async (req,res) => {
//     try {
//         const users  = await User.find();
//         const user_name = []
//         for(let i = 0 ; i < users.length; i++) {
//             let y = Object.assign({}, {
//                 title: users[i].name
//             });
//             user_name.push(y)
//         };
//         console.log(":",user_name);
//         let x = Object.assign({},{
//             "metadata": {
//                 "version": "2.0"
//               },
//               "content": [
//                 {
//                   "elementType": "heading",
//                   "title": "Form receipt"
//                 },
//                 {
//                   "elementType": "table",
//                   "columnOptions": [
//                     {
//                       "header": "Name",
//                       "width": "25%"
//                     },
//                     {
//                       "header": "Value"
//                     }
//                   ],
//                   "rows": [
//                     {
//                       "cells": user_name
//                     }
//                   ]
//                 }
//               ]
//         })
//         res
//         .json(x)
//     } catch (err) {
//         res
//         .status(500)
//         .json({
//             statusCode: 500,
//             status: false,
//             message: err.message
//         })
//     }
// };

exports.findUserDetails = async (req,res) => {
    const name = req.query.name
    try {
        const user  = await User.find({
            name: {$regex: new RegExp(name, 'i')}
        });
        res
        .status(200)
        .json({
            statusCode: 200,
            status: true, 
            message: "User Details!",
            data: user 
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
}

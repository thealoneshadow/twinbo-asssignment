const addChatsValidator = require("./addChatsValidator");

const addChatsController = async (req, res) => {

    //for validations and data checking
    addChatsValidator.addChats(req.body).then((data) => {
            res.status(200).json({
                success: true,
                isAuth: true,
                message: "Added Chats Successfully",
                result: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                isAuth: false,
                errorCode: 500,
                message: err,
                result: [],
              });
        })
}

module.exports = addChatsController;
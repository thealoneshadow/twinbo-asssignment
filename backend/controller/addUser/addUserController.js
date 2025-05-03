const addUserValidator = require("./addUserValidator");

const addUserController = async (req, res) => {

    //for validations and data checking
    addUserValidator.addUser(req.body).then((data) => {
            res.status(200).json({
                success: true,
                isAuth: true,
                message: "Added User Successfully",
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

module.exports = addUserController;
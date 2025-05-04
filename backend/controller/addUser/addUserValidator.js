const addUserValidator = {};
const Chats = require("../../model/chats");
const Users = require("../../model/user");

addUserValidator.addUser = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { clerkId, userName} = body;
      const existingUser = await Users.findOne({ clerkId });

      if (existingUser) {
        return resolve(existingUser);
      }

      const saveUser = new Users({
        clerkId,
        userName
      });
      const result = await saveUser.save();

      resolve(result);
    } catch (err) {
      console.error(err);
      reject("Something Went Wrong");
    }
  });
};

module.exports = addUserValidator;

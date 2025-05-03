const getChatsValidator = {};
const Chats = require("../../model/chats");

getChatsValidator.getChats = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId } = body;

    
      const result = await Chats.find({ userId }).sort({ createdAt: -1 });
      resolve(result);
    } catch (err) {
      console.error(err);
      reject("Something Went Wrong");
    }
  });
};

module.exports = getChatsValidator;

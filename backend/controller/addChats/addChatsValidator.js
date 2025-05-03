const addChatsValidator = {};
const Chats = require("../../model/chats");

addChatsValidator.addChats = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId, question, answer } = body;
      const saveChat = new Chats({
        userId,
        question,
        answer,
      });
      const result = await saveChat.save();

      resolve(result);
    } catch (err) {
      console.error(err);
      reject("Something Went Wrong");
    }
  });
};

module.exports = addChatsValidator;

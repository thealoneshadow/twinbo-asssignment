const express = require("express");
const router = express.Router()

const geminiAIController = require("../controller/gemini/geminiAIController");
const addChatsController = require("../controller/addChats/addChatsController");
const getChatsController = require("../controller/getChats/getChatsController");
const addUserController = require("../controller/addUser/addUserController");

router.post("/gemini-ai", geminiAIController);
router.post("/add-chats", addChatsController);
router.get("/get-chats", getChatsController);
router.post("/add-user", addUserController);


module.exports = router;
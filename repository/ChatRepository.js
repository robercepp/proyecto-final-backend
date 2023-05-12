const chatMongoDb = require("../daos/chatMongoDb");
const chatModel = require("../models/chat.Model");

module.exports = class ChatRepository extends chatMongoDb {
  constructor() {
    super(chatModel);
  }
  async getAllChannels() {
    const data = await this.getAll();
    return data;
  }
  async getChannelByMail(email) {
    const data = await this.getByEmail(email);
    return data;
  }
  async sendMessage(message) {
    const data = await this.addMessage(message);
    return data;
  }
};

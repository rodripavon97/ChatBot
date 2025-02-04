// ChatUseCase.js
import ChatbotAPI from '../../../infrasctucture/chat/adapters/ChatBotAPI';
import ChatbotAPIA from '../../../infrasctucture/chat/adapters/ChatBotAPIA';
import ChatbotAPIS from '../../../infrasctucture/chat/adapters/ChatBotAPIS';


/// ChatUseCase.js
class ChatUseCase {
  constructor() {
    this.chatbotAPI = new ChatbotAPI();
    this.chatbotAPIA = new ChatbotAPIA();
    this.chatbotAPIS = new ChatbotAPIS();
    this.activeChatbotAPI = null;
    this.userDNI = null;
    this.startMessage = "Por favor, ingrese su DNI";
  }

  startChat() {
    this.activeChatbotAPI = this.chatbotAPI;
  }

  async sendMessage(userMessage) {
    if (this.activeChatbotAPI === null) {
      return this.startMessage;
    }
    console.log(this.userDNI);
    let response = await this.activeChatbotAPI.sendMessage(userMessage);

    if (response.response === 'Conectando con un asesor...') {
      this.activeChatbotAPI = this.chatbotAPIA;
    }

    if (userMessage === '3' && this.userDNI) {
      response = await this.chatbotAPIS.receivedConsumo(this.userDNI);
      console.log(response);
    }

    
    return response.response;
  }
}

export default ChatUseCase;
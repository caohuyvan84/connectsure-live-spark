// Mock Chat Service for ConnectSure
export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  fileUrl?: string;
  fileName?: string;
}

class ChatService {
  private messages: ChatMessage[] = [
    {
      id: "1",
      text: "Xin chào! Tôi là Lê Thị Minh, tư vấn viên của ConnectSure. Tôi sẽ hỗ trợ bạn trong quá trình eKYC hôm nay.",
      senderId: "agent_001",
      senderName: "Lê Thị Minh",
      timestamp: new Date(Date.now() - 300000),
      type: "text"
    },
    {
      id: "2", 
      text: "Xin chào chị! Em đã chuẩn bị đầy đủ giấy tờ rồi ạ.",
      senderId: "customer_001",
      senderName: "Nguyễn Văn An",
      timestamp: new Date(Date.now() - 240000),
      type: "text"
    },
    {
      id: "3",
      text: "Tuyệt vời! Chúng ta sẽ bắt đầu với việc chụp CCCD của bạn. Vui lòng chuẩn bị CCCD và làm theo hướng dẫn trên màn hình.",
      senderId: "agent_001", 
      senderName: "Lê Thị Minh",
      timestamp: new Date(Date.now() - 180000),
      type: "text"
    }
  ];

  private messageListeners: ((messages: ChatMessage[]) => void)[] = [];

  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  async sendMessage(text: string, senderId: string, senderName: string): Promise<void> {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      senderId,
      senderName,
      timestamp: new Date(),
      type: "text"
    };

    this.messages.push(newMessage);
    this.notifyListeners();

    // Simulate agent auto-reply for demo
    if (senderId.startsWith("customer")) {
      setTimeout(() => {
        this.simulateAgentReply();
      }, 1000 + Math.random() * 2000);
    }
  }

  async attachFile(file: File, senderId: string, senderName: string): Promise<void> {
    // Simulate file upload
    const fileUrl = URL.createObjectURL(file);
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `Đã gửi file: ${file.name}`,
      senderId,
      senderName,
      timestamp: new Date(),
      type: "file",
      fileUrl,
      fileName: file.name
    };

    this.messages.push(newMessage);
    this.notifyListeners();
  }

  addSystemMessage(text: string): void {
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      senderId: "system",
      senderName: "Hệ thống",
      timestamp: new Date(),
      type: "system"
    };

    this.messages.push(systemMessage);
    this.notifyListeners();
  }

  // Quick replies for agent
  getQuickReplies(): string[] {
    return [
      "Cảm ơn bạn đã cung cấp thông tin",
      "Vui lòng đợi trong giây lát",
      "Bạn có thể lặp lại thông tin được không?",
      "Hãy kiểm tra lại camera và thử lại",
      "Quá trình xử lý sẽ mất vài phút"
    ];
  }

  subscribe(callback: (messages: ChatMessage[]) => void): () => void {
    this.messageListeners.push(callback);
    return () => {
      const index = this.messageListeners.indexOf(callback);
      if (index > -1) {
        this.messageListeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.messageListeners.forEach(listener => listener([...this.messages]));
  }

  private simulateAgentReply(): void {
    const replies = [
      "Cảm ơn bạn! Tôi đã nhận được thông tin.",
      "Được rồi, chúng ta tiếp tục bước tiếp theo nhé.",
      "Tôi sẽ kiểm tra và phản hồi ngay.",
      "Thông tin của bạn đã được ghi nhận."
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    const agentMessage: ChatMessage = {
      id: Date.now().toString(),
      text: randomReply,
      senderId: "agent_001",
      senderName: "Lê Thị Minh", 
      timestamp: new Date(),
      type: "text"
    };

    this.messages.push(agentMessage);
    this.notifyListeners();
  }
}

export const chatService = new ChatService();
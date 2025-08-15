import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/layout/Logo";
import { videoCallService } from "@/services/videoCallService";
import { chatService } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  UserPlus,
  Users,
  Clock,
  User,
  FileText,
  Camera,
  CheckCircle,
  Eye,
  EyeOff,
  MessageCircle,
  History
} from "lucide-react";

interface AgentDashboardProps {
  onLogout: () => void;
}

export const AgentDashboard = ({ onLogout }: AgentDashboardProps) => {
  const [callState, setCallState] = useState(videoCallService.getCallState());
  const [chatMessages, setChatMessages] = useState(chatService.getMessages());
  const [newMessage, setNewMessage] = useState("");
  const [showAgentVideo, setShowAgentVideo] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Start call simulation
    videoCallService.startCall();
    
    const callInterval = setInterval(() => {
      setCallState(videoCallService.getCallState());
    }, 1000);

    const unsubscribeChat = chatService.subscribe((messages) => {
      setChatMessages(messages);
    });

    return () => {
      clearInterval(callInterval);
      unsubscribeChat();
    };
  }, []);

  const handleToggleMic = () => {
    videoCallService.toggleMic();
    toast({
      title: callState.isAudioMuted ? "Đã bật mic" : "Đã tắt mic",
    });
  };

  const handleToggleCamera = () => {
    videoCallService.toggleCamera();
    toast({
      title: callState.isVideoOff ? "Đã bật camera" : "Đã tắt camera",
    });
  };

  const handleToggleHold = () => {
    const isOnHold = videoCallService.toggleHold();
    toast({
      title: isOnHold ? "Đã tạm dừng cuộc gọi" : "Đã tiếp tục cuộc gọi",
    });
  };

  const handleEndCall = () => {
    videoCallService.endCall();
    toast({
      title: "Đã kết thúc cuộc gọi",
      description: "Báo cáo cuộc gọi đã được lưu",
    });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      chatService.sendMessage(newMessage, 'agent_001', 'Lê Thị Minh');
      setNewMessage('');
    }
  };

  const quickReplies = chatService.getQuickReplies();

  const customerData = {
    name: "Nguyễn Văn An",
    phone: "0123456789",
    email: "nguyenvanan@email.com",
    customerCode: "CS001234",
    joinDate: "15/08/2024",
    lastContact: "14/08/2025"
  };

  const capturedImages = [
    { id: 1, type: "CCCD Mặt trước", url: "/placeholder-id-front.jpg", timestamp: "15:05:23" },
    { id: 2, type: "CCCD Mặt sau", url: "/placeholder-id-back.jpg", timestamp: "15:05:45" },
    { id: 3, type: "Ảnh chân dung", url: "/placeholder-portrait.jpg", timestamp: "15:06:12" },
  ];

  const ekycSteps = [
    { id: 1, title: "Xác minh CCCD mặt trước", completed: true },
    { id: 2, title: "Xác minh CCCD mặt sau", completed: true },
    { id: 3, title: "Kiểm tra sinh trắc học", completed: false },
    { id: 4, title: "So sánh khuôn mặt", completed: false },
    { id: 5, title: "Hoàn tất xác thực", completed: false },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-card-border shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-success border-success">
              Đang hoạt động
            </Badge>
            <Button variant="outline" onClick={onLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Customer Information */}
        <div className="w-80 border-r border-card-border bg-card">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-card-border">
              <h2 className="font-semibold text-lg">Thông tin khách hàng</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 m-4">
                  <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
                  <TabsTrigger value="history">Lịch sử</TabsTrigger>
                  <TabsTrigger value="tickets">Tickets</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="px-4 space-y-4">
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <User className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold">{customerData.name}</h3>
                        <p className="text-sm text-muted-foreground">{customerData.customerCode}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Điện thoại:</span>
                          <span className="font-medium">{customerData.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email:</span>
                          <span className="font-medium">{customerData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ngày tham gia:</span>
                          <span className="font-medium">{customerData.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Liên hệ cuối:</span>
                          <span className="font-medium">{customerData.lastContact}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Captured Images */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Hình ảnh đã chụp</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {capturedImages.map((image) => (
                          <div 
                            key={image.id}
                            className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedImage(image.url)}
                          >
                            <div className="w-full h-full flex items-center justify-center">
                              <Camera className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1">
                              <p className="truncate">{image.type}</p>
                              <p className="opacity-70">{image.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="px-4">
                  <div className="space-y-3">
                    {[
                      { type: "Cuộc gọi", duration: "12:45", date: "14/08/2025", hasRecording: true },
                      { type: "Chat", messages: 25, date: "10/08/2025", hasRecording: false },
                      { type: "eKYC", status: "Hoàn thành", date: "10/08/2025", hasRecording: true },
                    ].map((item, index) => (
                      <Card key={index} className="hover:shadow-sm transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{item.type}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                              {item.duration && <p className="text-xs">Thời lượng: {item.duration}</p>}
                              {item.messages && <p className="text-xs">{item.messages} tin nhắn</p>}
                              {item.status && <p className="text-xs">Trạng thái: {item.status}</p>}
                            </div>
                            {item.hasRecording && (
                              <Button variant="outline" size="sm" className="text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                Xem
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="tickets" className="px-4">
                  <div className="space-y-3">
                    <Card>
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">Lỗi eKYC</p>
                            <p className="text-xs text-muted-foreground">Ticket #TK001</p>
                            <p className="text-xs">Ngày tạo: 14/08/2025</p>
                          </div>
                          <Badge variant="outline" className="text-xs">Đang xử lý</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Center Panel - Video Call */}
        <div className="flex-1 flex flex-col">
          {/* Video Area */}
          <div className="flex-1 relative bg-gray-900">
            {/* Customer Video */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <User size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Nguyễn Văn An</p>
                <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                  {videoCallService.formatDuration(callState.duration)}
                </Badge>
              </div>
            </div>

            {/* Agent Video PiP */}
            {showAgentVideo && (
              <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <User size={32} className="mx-auto mb-2" />
                    <p className="text-sm">Lê Thị Minh</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 w-6 h-6 text-white hover:bg-white/20"
                  onClick={() => setShowAgentVideo(false)}
                >
                  <EyeOff size={12} />
                </Button>
              </div>
            )}

            {!showAgentVideo && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4"
                onClick={() => setShowAgentVideo(true)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Hiện video
              </Button>
            )}
          </div>

          {/* Call Controls */}
          <div className="bg-card border-t border-card-border p-4">
            <div className="flex items-center justify-center gap-3">
              <Button
                variant={callState.isAudioMuted ? "destructive" : "secondary"}
                size="icon"
                onClick={handleToggleMic}
                className="rounded-full"
              >
                {callState.isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </Button>

              <Button
                variant={callState.isVideoOff ? "destructive" : "secondary"}
                size="icon"
                onClick={handleToggleCamera}
                className="rounded-full"
              >
                {callState.isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
              </Button>

              <Button
                variant={callState.isOnHold ? "warning" : "secondary"}
                size="icon"
                onClick={handleToggleHold}
                className="rounded-full"
              >
                <Clock size={20} />
              </Button>

              <Button variant="secondary" size="icon" className="rounded-full">
                <UserPlus size={20} />
              </Button>

              <Button variant="secondary" size="icon" className="rounded-full">
                <Users size={20} />
              </Button>

              <Button
                variant="callEnd"
                size="icon"
                onClick={handleEndCall}
                className="rounded-full"
              >
                <PhoneOff size={20} />
              </Button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="h-64 border-t border-card-border bg-card">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-card-border">
                <h3 className="font-semibold text-sm">Tin nhắn</h3>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId.startsWith('agent') ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-2 text-sm ${
                        message.senderId.startsWith('agent')
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Replies */}
              <div className="flex gap-1 p-2 border-t border-card-border overflow-x-auto">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs whitespace-nowrap"
                    onClick={() => setNewMessage(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
              
              <div className="p-3 border-t border-card-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button variant="brand" size="sm" onClick={sendMessage}>
                    Gửi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - eKYC & Scripts */}
        <div className="w-80 border-l border-card-border bg-card">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-card-border">
              <h2 className="font-semibold text-lg">eKYC & Hỗ trợ</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* eKYC Workflow */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quy trình eKYC</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {ekycSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-success text-success-foreground' : 'bg-muted'
                      }`}>
                        {step.completed ? (
                          <CheckCircle size={14} />
                        ) : (
                          <span className="text-xs">{step.id}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3 space-y-2">
                    <Button variant="brand" size="sm" className="w-full">
                      <Camera className="h-4 w-4 mr-1" />
                      Bắt đầu chụp
                    </Button>
                    <Button variant="success" size="sm" className="w-full">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Hoàn tất & Ký hợp đồng
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Support Script */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Kịch bản hỗ trợ</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-sm space-y-2 text-muted-foreground">
                    <p className="font-medium text-foreground">Bước 1: Chào hỏi</p>
                    <p>"Xin chào anh/chị! Tôi là [Tên], tư vấn viên của ConnectSure. Hôm nay tôi sẽ hỗ trợ anh/chị hoàn thành quy trình eKYC."</p>
                    
                    <p className="font-medium text-foreground pt-2">Bước 2: Hướng dẫn eKYC</p>
                    <p>"Chúng ta sẽ thực hiện 3 bước: chụp CCCD mặt trước, mặt sau, và kiểm tra sinh trắc học. Anh/chị đã chuẩn bị CCCD chưa?"</p>
                    
                    <p className="font-medium text-foreground pt-2">Bước 3: Hoàn tất</p>
                    <p>"Tuyệt vời! Anh/chị đã hoàn thành xác thực. Bây giờ chúng ta tiến hành ký hợp đồng điện tử."</p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <FileText className="h-4 w-4 mr-1" />
                    Tạo Ticket Hỗ trợ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="max-w-2xl max-h-[80vh] bg-card rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-card-border">
              <h3 className="font-semibold">Xem hình ảnh</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedImage(null)}>
                ✕
              </Button>
            </div>
            <div className="p-4">
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                <Camera className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
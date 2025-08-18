import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/layout/Logo";
import { videoCallService } from "@/services/videoCallService";
import { chatService } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";
import { ImageViewerModal } from "./modals/ImageViewerModal";
import { VideoPlaybackModal } from "./modals/VideoPlaybackModal";
import { AddParticipantModal } from "./modals/AddParticipantModal";
import { TransferCallModal } from "./modals/TransferCallModal";
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
  History,
  Send,
  Pause,
  Play,
  PhoneForwarded,
  TicketIcon,
  FileSignature
} from "lucide-react";

interface AgentDashboardProps {
  onLogout: () => void;
}

export const AgentDashboard = ({ onLogout }: AgentDashboardProps) => {
  const [callState, setCallState] = useState(videoCallService.getCallState());
  const [chatMessages, setChatMessages] = useState(chatService.getMessages());
  const [newMessage, setNewMessage] = useState("");
  const [showAgentVideo, setShowAgentVideo] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showVideoPlayback, setShowVideoPlayback] = useState(false);
  const [selectedCallRecord, setSelectedCallRecord] = useState<any>(null);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showTransferCall, setShowTransferCall] = useState(false);
  const [agentVideoPosition, setAgentVideoPosition] = useState({ x: 16, y: 16 });
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

  

  // Enhanced customer data matching prototype specs
  const customerData = {
    name: "Nguyễn Văn An",
    phone: "0901 234 567",
    email: "nguyenvanan@email.com",
    customerCode: "NA",
    joinDate: "15/08/2024",
    lastContact: "14/08/2025",
    currentRequest: "eKYC Hợp đồng An Tâm Trọn Vẹn (#HD-8654)",
    dateOfBirth: "01/01/1990",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    policy: "An Tâm Trọn Vẹn",
    policyStartDate: "01/01/2025",
    premium: "10,000,000 VND/năm"
  };

  const capturedImages = [
    { id: 1, type: "CCCD mặt trước", url: "/placeholder-id-front.jpg", timestamp: "15:05:23" },
    { id: 2, type: "CCCD mặt sau", url: "/placeholder-id-back.jpg", timestamp: "15:05:45" },
    { id: 3, type: "Ảnh chân dung", url: "/placeholder-portrait.jpg", timestamp: "15:06:12" },
  ];

  // Enhanced history data matching prototype specs
  const historyData = [
    { 
      type: "Video Call (eKYC)", 
      date: "12/08/2025", 
      duration: "10 phút 30 giây", 
      status: "Hoàn thành",
      hasRecording: true 
    },
    { 
      type: "Video Call (Tư vấn sản phẩm)", 
      date: "05/08/2025", 
      duration: "25 phút 15 giây", 
      status: "Hoàn thành",
      hasRecording: true 
    },
    { 
      type: "Trò chuyện hỗ trợ (Giải đáp thắc mắc)", 
      date: "01/08/2025", 
      status: "Hoàn thành",
      hasRecording: false 
    },
  ];

  // Enhanced tickets data
  const ticketsData = [
    {
      id: "001",
      title: "Yêu cầu bồi thường",
      status: "Đang xử lý",
      date: "12/08/2025"
    },
    {
      id: "002", 
      title: "Thay đổi thông tin cá nhân",
      status: "Đã hoàn thành",
      date: "10/08/2025"
    }
  ];

  const ekycSteps = [
    { id: 1, title: "Xác minh CCCD mặt trước", completed: true },
    { id: 2, title: "Xác minh CCCD mặt sau", completed: true },
    { id: 3, title: "Kiểm tra sinh trắc học", completed: false },
    { id: 4, title: "So sánh khuôn mặt", completed: false },
    { id: 5, title: "Hoàn tất xác thực", completed: false },
  ];

  const quickReplies = [
    "Cảm ơn bạn đã cung cấp thông tin",
    "Vui lòng đợi trong giây lát", 
    "Bạn có thể lặp lại thông tin được không?"
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header - Exact Assist Prototype Match */}
      <header className="bg-primary border-b shadow-sm">
        <div className="flex justify-between items-center px-6 py-3">
          <Logo size="md" className="text-primary-foreground" />
          <div className="flex items-center gap-4">
            <Badge className="bg-success text-success-foreground border-success">
              Đang hoạt động
            </Badge>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Customer Information - Exact Assist Prototype Match */}
        <div className="w-80 border-r border-border bg-card">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border bg-primary">
              <h2 className="font-semibold text-lg text-primary-foreground">Thông tin khách hàng</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 m-4 bg-muted">
                  <TabsTrigger value="profile" className="text-xs">Hồ sơ</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs">Lịch sử</TabsTrigger>
                  <TabsTrigger value="tickets" className="text-xs">Tickets</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="px-4 space-y-4">
                  {/* Customer Profile Card */}
                  <Card className="border-border">
                    <CardContent className="p-4 space-y-3">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-primary-foreground font-bold text-lg">{customerData.customerCode}</span>
                        </div>
                        <h3 className="font-semibold text-base">{customerData.name}</h3>
                        <p className="text-sm text-muted-foreground">{customerData.phone}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{customerData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ngày tham gia:</span>
                          <span className="font-medium">{customerData.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Liên hệ cuối:</span>
                          <span className="font-medium">{customerData.lastContact}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-1">Yêu cầu hiện tại:</p>
                        <p className="text-sm font-medium text-foreground">{customerData.currentRequest}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Details */}
                  <Card className="border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Chi tiết khách hàng</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ngày sinh:</span>
                        <span className="font-medium">{customerData.dateOfBirth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Địa chỉ:</span>
                        <span className="font-medium text-right flex-1 ml-2">{customerData.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gói bảo hiểm:</span>
                        <span className="font-medium">{customerData.policy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ngày bắt đầu:</span>
                        <span className="font-medium">{customerData.policyStartDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phí bảo hiểm:</span>
                        <span className="font-medium">{customerData.premium}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Captured Images - Enhanced */}
                  <Card className="border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Hình ảnh đã chụp</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-3 gap-2">
                        {capturedImages.map((image, index) => (
                          <div 
                            key={image.id}
                            className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-border"
                            onClick={() => setSelectedImageIndex(index)}
                          >
                            <div className="w-full h-full flex items-center justify-center">
                              <Camera className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1">
                              <p className="truncate text-[10px]">{image.type}</p>
                              <p className="opacity-70 text-[9px]">{image.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="px-4">
                  <div className="space-y-3">
                    {historyData.map((item, index) => (
                      <Card key={index} className="hover:shadow-sm transition-shadow border-border">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.type}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                              {item.duration && <p className="text-xs text-foreground">{item.duration}</p>}
                              <p className="text-xs text-success">{item.status}</p>
                            </div>
                            {item.hasRecording && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => {
                                  setSelectedCallRecord(item);
                                  setShowVideoPlayback(true);
                                }}
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Nghe ghi âm
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
                    {ticketsData.map((ticket) => (
                      <Card key={ticket.id} className="border-border">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">Ticket #{ticket.id}: {ticket.title}</p>
                              <p className="text-xs text-muted-foreground">Ngày tạo: {ticket.date}</p>
                            </div>
                            <Badge 
                              variant={ticket.status === "Đã hoàn thành" ? "default" : "secondary"}
                              className={ticket.status === "Đã hoàn thành" ? "bg-success text-success-foreground" : ""}
                            >
                              {ticket.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Center Panel - Main Video Call Interface */}
        <div className="flex-1 flex flex-col">
          {/* Video Area with Call Duration */}
          <div className="flex-1 relative bg-gray-900">
            {/* Call Duration Display */}
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-black/70 text-white border-white/20 text-sm">
                Thời gian đàm thoại: {videoCallService.formatDuration(callState.duration)}
              </Badge>
            </div>

            {/* Customer Video Feed */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-2xl">{customerData.customerCode}</span>
                </div>
                <p className="text-xl mb-2">{customerData.name}</p>
                <p className="text-sm opacity-70">{customerData.phone}</p>
              </div>
            </div>

            {/* Agent Video PiP - Draggable and Toggleable */}
            {showAgentVideo && (
              <div 
                className="absolute w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg cursor-move"
                style={{ 
                  top: `${agentVideoPosition.y}px`, 
                  right: `${agentVideoPosition.x}px` 
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-primary-foreground font-semibold text-sm">LM</span>
                    </div>
                    <p className="text-sm">Lê Thị Minh</p>
                    <p className="text-xs opacity-70">Tư vấn viên</p>
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

          {/* Enhanced Call Controls */}
          <div className="bg-card border-t border-border p-4">
            <div className="flex items-center justify-center gap-3">
              <Button
                variant={callState.isAudioMuted ? "destructive" : "secondary"}
                size="icon"
                onClick={handleToggleMic}
                className="rounded-full w-12 h-12"
                title={callState.isAudioMuted ? "Bật mic" : "Tắt mic"}
              >
                {callState.isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </Button>

              <Button
                variant={callState.isVideoOff ? "destructive" : "secondary"}
                size="icon"
                onClick={handleToggleCamera}
                className="rounded-full w-12 h-12"
                title={callState.isVideoOff ? "Bật camera" : "Tắt camera"}
              >
                {callState.isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
              </Button>

              <Button
                variant={callState.isOnHold ? "default" : "secondary"}
                size="icon"
                onClick={handleToggleHold}
                className={`rounded-full w-12 h-12 ${callState.isOnHold ? 'bg-warning text-warning-foreground hover:bg-warning/90' : ''}`}
                title={callState.isOnHold ? "Tiếp tục cuộc gọi" : "Tạm dừng cuộc gọi"}
              >
                {callState.isOnHold ? <Play size={20} /> : <Pause size={20} />}
              </Button>

              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full w-12 h-12"
                onClick={() => setShowAddParticipant(true)}
                title="Thêm người tham gia"
              >
                <UserPlus size={20} />
              </Button>

              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full w-12 h-12"
                onClick={() => setShowTransferCall(true)}
                title="Chuyển cuộc gọi"
              >
                <PhoneForwarded size={20} />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={handleEndCall}
                className="rounded-full w-12 h-12"
                title="Kết thúc cuộc gọi"
              >
                <PhoneOff size={20} />
              </Button>
            </div>
          </div>

          {/* Enhanced Chat Interface */}
          <div className="h-64 border-t border-border bg-card">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <h3 className="font-semibold text-sm">Tin nhắn</h3>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              
              {/* Auto-scrolling chat messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2" id="chat-messages">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId.startsWith('agent') ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-2 text-sm ${
                        message.senderId.startsWith('agent')
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted border border-border'
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

              {/* Enhanced Quick Replies */}
              <div className="flex gap-1 p-2 border-t border-border overflow-x-auto">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs whitespace-nowrap hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setNewMessage(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
              
              <div className="p-3 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button className="bg-success text-success-foreground hover:bg-success/90" size="sm" onClick={sendMessage}>
                    <Send className="h-4 w-4 mr-1" />
                    Gửi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - eKYC Tools & Workflow - Exact Assist Prototype Match */}
        <div className="w-80 border-l border-border bg-card">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border bg-primary">
              <h2 className="font-semibold text-lg text-primary-foreground">eKYC & Hỗ trợ</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* eKYC Checklist */}
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Quy trình eKYC Checklist</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  {ekycSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        step.completed 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-muted text-muted-foreground border border-border'
                      }`}>
                        {step.completed ? '✓' : step.id}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${
                          step.completed 
                            ? 'line-through text-muted-foreground' 
                            : 'text-foreground'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3 space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Bắt đầu chụp
                    </Button>
                    <Button className="w-full bg-success text-success-foreground hover:bg-success/90" size="sm">
                      <FileSignature className="h-4 w-4 mr-2" />
                      Hoàn tất & Ký hợp đồng
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Support Script */}
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Kịch bản hỗ trợ</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-sm space-y-3 max-h-64 overflow-y-auto">
                    <div className="p-2 bg-muted rounded-md">
                      <p className="font-medium text-primary mb-1">🔹 Bước 1: Chào hỏi</p>
                      <p className="text-xs text-muted-foreground">"Xin chào anh/chị! Tôi là Lê Thị Minh, tư vấn viên của ConnectSure. Hôm nay tôi sẽ hỗ trợ anh/chị hoàn thành quy trình eKYC."</p>
                    </div>
                    
                    <div className="p-2 bg-muted rounded-md">
                      <p className="font-medium text-primary mb-1">🔹 Bước 2: Hướng dẫn eKYC</p>
                      <p className="text-xs text-muted-foreground">"Chúng ta sẽ thực hiện 3 bước: chụp CCCD mặt trước, mặt sau, và kiểm tra sinh trắc học. Anh/chị đã chuẩn bị CCCD chưa?"</p>
                    </div>
                    
                    <div className="p-2 bg-muted rounded-md">
                      <p className="font-medium text-primary mb-1">🔹 Bước 3: Chụp ảnh CCCD</p>
                      <p className="text-xs text-muted-foreground">"Vui lòng giữ CCCD thật chắc, đảm bảo ánh sáng tốt và không bị lóa. Tôi sẽ hướng dẫn anh/chị từng bước."</p>
                    </div>

                    <div className="p-2 bg-muted rounded-md">
                      <p className="font-medium text-primary mb-1">🔹 Bước 4: Sinh trắc học</p>
                      <p className="text-xs text-muted-foreground">"Bây giờ chúng ta thực hiện kiểm tra khuôn mặt. Vui lòng nhìn thẳng vào camera và làm theo hướng dẫn."</p>
                    </div>
                    
                    <div className="p-2 bg-muted rounded-md">
                      <p className="font-medium text-primary mb-1">🔹 Bước 5: Hoàn tất</p>
                      <p className="text-xs text-muted-foreground">"Tuyệt vời! Anh/chị đã hoàn thành xác thực. Bây giờ chúng ta tiến hành ký hợp đồng điện tử."</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                  >
                    <TicketIcon className="h-4 w-4 mr-2" />
                    Tạo Ticket Hỗ trợ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modals */}
      <ImageViewerModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={capturedImages}
        initialIndex={selectedImageIndex || 0}
      />

      <VideoPlaybackModal
        isOpen={showVideoPlayback}
        onClose={() => setShowVideoPlayback(false)}
        callRecord={selectedCallRecord}
      />

      <AddParticipantModal
        isOpen={showAddParticipant}
        onClose={() => setShowAddParticipant(false)}
      />

      <TransferCallModal
        isOpen={showTransferCall}
        onClose={() => setShowTransferCall(false)}
      />
    </div>
  );
};
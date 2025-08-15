import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { videoCallService } from "@/services/videoCallService";
import { chatService } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  RotateCcw, 
  MessageCircle, 
  X,
  Camera,
  User
} from "lucide-react";

interface VideoCallProps {
  onEndCall: () => void;
}

export const CustomerVideoCall = ({ onEndCall }: VideoCallProps) => {
  const [callState, setCallState] = useState(videoCallService.getCallState());
  const [chatOpen, setChatOpen] = useState(false);
  const [showEKYC, setShowEKYC] = useState(false);
  const [ekycStep, setEkycStep] = useState<'idle' | 'id-scan' | 'liveness'>('idle');
  const { toast } = useToast();

  const videoRef = useRef<HTMLDivElement>(null);
  const pipVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    videoCallService.startCall();
    const interval = setInterval(() => {
      setCallState(videoCallService.getCallState());
    }, 1000);

    return () => {
      clearInterval(interval);
      videoCallService.endCall();
    };
  }, []);

  const handleToggleMic = () => {
    const isMuted = videoCallService.toggleMic();
    toast({
      title: isMuted ? "Đã tắt mic" : "Đã bật mic",
    });
  };

  const handleToggleCamera = () => {
    const isOff = videoCallService.toggleCamera();
    toast({
      title: isOff ? "Đã tắt camera" : "Đã bật camera",
    });
  };

  const handleFlipCamera = () => {
    videoCallService.flipCamera();
    toast({
      title: "Đã chuyển camera",
    });
  };

  const handleEndCall = () => {
    videoCallService.endCall();
    onEndCall();
  };

  const startEKYC = (step: 'id-scan' | 'liveness') => {
    setEkycStep(step);
    setShowEKYC(true);
    
    if (step === 'id-scan') {
      toast({
        title: "Bắt đầu chụp CCCD",
        description: "Vui lòng đặt CCCD vào khung hình",
      });
    } else {
      toast({
        title: "Bắt đầu kiểm tra sinh trắc",
        description: "Nhìn thẳng vào camera và thực hiện theo hướng dẫn",
      });
    }
  };

  const completeEKYC = async () => {
    if (ekycStep === 'id-scan') {
      await videoCallService.captureID();
      toast({
        title: "Đã chụp CCCD thành công",
        description: "Hình ảnh đã được gửi cho tư vấn viên",
      });
    } else {
      await videoCallService.performLivenessCheck();
      toast({
        title: "Hoàn thành kiểm tra sinh trắc",
        description: "Xác thực danh tính thành công",
      });
    }
    setShowEKYC(false);
    setEkycStep('idle');
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Main Video Area */}
      <div className="flex-1 relative">
        {/* Customer's Video Feed (Main) */}
        <div 
          ref={videoRef}
          className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative"
        >
          {callState.isVideoOff ? (
            <div className="text-center text-white">
              <User size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Camera đã tắt</p>
            </div>
          ) : (
            <div className="text-center text-white">
              <Camera size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Camera của bạn</p>
            </div>
          )}
        </div>

        {/* Agent's Video Feed (Picture-in-Picture) */}
        <div 
          ref={pipVideoRef}
          className="absolute top-4 right-4 w-32 h-24 md:w-48 md:h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-white/20 cursor-move shadow-lg"
        >
          <div className="w-full h-full flex items-center justify-center text-white text-sm">
            <div className="text-center">
              <User size={24} className="mx-auto mb-1" />
              <p className="text-xs">Lê Thị Minh</p>
            </div>
          </div>
        </div>

        {/* Call Duration */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
            {videoCallService.formatDuration(callState.duration)}
          </Badge>
        </div>

        {/* eKYC Overlay */}
        {showEKYC && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <Card className="max-w-md mx-4">
              <CardContent className="p-6 text-center">
                {ekycStep === 'id-scan' ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Chụp mặt trước CCCD</h3>
                    <div className="w-64 h-40 mx-auto border-2 border-dashed border-primary rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-2 border-2 border-primary rounded-lg"></div>
                      <div className="text-center text-muted-foreground">
                        <Camera size={32} className="mx-auto mb-2" />
                        <p className="text-sm">Đặt CCCD vào khung này</p>
                      </div>
                      {/* Corner guides */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Kiểm tra sinh trắc học</h3>
                    <div className="w-48 h-48 mx-auto border-4 border-primary rounded-full flex items-center justify-center relative overflow-hidden">
                      <div className="w-40 h-40 border-2 border-dashed border-primary rounded-full flex items-center justify-center">
                        <User size={48} className="text-primary" />
                      </div>
                      {/* Progress circle */}
                      <div className="absolute inset-0 border-4 border-transparent border-t-success rounded-full animate-spin"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Nhìn thẳng vào camera và giữ yên
                    </p>
                  </div>
                )}
                
                <div className="flex gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEKYC(false)}
                    className="flex-1"
                  >
                    Hủy
                  </Button>
                  <Button 
                    variant="brand" 
                    onClick={completeEKYC}
                    className="flex-1"
                  >
                    Hoàn thành
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-black/80 backdrop-blur-sm p-4 border-t border-white/10">
        <div className="flex items-center justify-center gap-4">
          {/* Mic Control */}
          <Button
            variant={callState.isAudioMuted ? "destructive" : "secondary"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={handleToggleMic}
          >
            {callState.isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </Button>

          {/* Video Control */}
          <Button
            variant={callState.isVideoOff ? "destructive" : "secondary"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={handleToggleCamera}
          >
            {callState.isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </Button>

          {/* Flip Camera (Mobile) */}
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12 md:hidden"
            onClick={handleFlipCamera}
          >
            <RotateCcw size={20} />
          </Button>

          {/* Chat Toggle */}
          <Button
            variant={chatOpen ? "brand" : "secondary"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setChatOpen(!chatOpen)}
          >
            <MessageCircle size={20} />
          </Button>

          {/* End Call */}
          <Button
            variant="callEnd"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={handleEndCall}
          >
            <Phone size={20} />
          </Button>
        </div>
      </div>

      {/* Chat Sidebar */}
      {chatOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-card border-l border-border shadow-xl md:relative md:w-96">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold">Tin nhắn</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setChatOpen(false)}
                className="md:hidden"
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                {chatService.getMessages().map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId.startsWith('customer') ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.senderId.startsWith('customer')
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
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
            </div>
            
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      chatService.sendMessage(e.currentTarget.value, 'customer_001', 'Nguyễn Văn An');
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button variant="brand" size="sm">
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* eKYC Quick Actions (Agent can trigger these) */}
      <div className="fixed bottom-20 left-4 space-y-2 md:bottom-4">
        <Button
          variant="warning"
          size="sm"
          onClick={() => startEKYC('id-scan')}
          className="w-full"
        >
          Chụp CCCD
        </Button>
        <Button
          variant="brand"
          size="sm"
          onClick={() => startEKYC('liveness')}
          className="w-full"
        >
          Kiểm tra sinh trắc
        </Button>
      </div>
    </div>
  );
};
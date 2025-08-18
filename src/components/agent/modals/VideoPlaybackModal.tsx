import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";

interface VideoPlaybackModalProps {
  isOpen: boolean;
  onClose: () => void;
  callRecord: {
    type: string;
    date: string;
    duration: string;
  };
}

export const VideoPlaybackModal = ({ isOpen, onClose, callRecord }: VideoPlaybackModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  const sampleTranscript = [
    { time: "00:00:05", speaker: "Agent", text: "Chào anh An, em là Lê Thị Minh từ ConnectSure." },
    { time: "00:00:12", speaker: "Customer", text: "Chào cô Minh." },
    { time: "00:00:15", speaker: "Agent", text: "Hôm nay chúng ta sẽ thực hiện eKYC cho hợp đồng An Tâm Trọn Vẹn." },
    { time: "00:00:25", speaker: "Customer", text: "Vâng, tôi đã chuẩn bị giấy tờ rồi." },
    { time: "00:00:30", speaker: "Agent", text: "Tuyệt vời. Đầu tiên, anh vui lòng chụp ảnh mặt trước CCCD." },
    { time: "00:00:35", speaker: "Customer", text: "Được, tôi sẽ chụp ngay." },
    { time: "00:00:42", speaker: "Agent", text: "Ảnh rất rõ nét. Giờ anh chụp mặt sau CCCD nhé." },
    { time: "00:00:50", speaker: "Customer", text: "Xong rồi ạ." },
    { time: "00:00:55", speaker: "Agent", text: "Bây giờ chúng ta thực hiện xác thực khuôn mặt." }
  ];

  const speeds = [0.5, 1, 1.5, 2];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[85vh] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span>{callRecord.type} - {callRecord.date}</span>
              <Badge variant="outline" className="ml-2">Thời lượng: {callRecord.duration}</Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex">
          {/* Video Player */}
          <div className="flex-1 bg-gray-900 flex flex-col">
            {/* Video Area */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-lg mb-4">Ghi âm cuộc gọi</p>
                <p className="text-sm opacity-70">{callRecord.date} - {callRecord.duration}</p>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="bg-gray-800 p-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                {/* Progress bar */}
                <div className="flex-1 bg-gray-600 h-2 rounded">
                  <div 
                    className="bg-primary h-full rounded" 
                    style={{ width: `${(currentTime / 630) * 100}%` }}
                  />
                </div>
                
                <span className="text-white text-sm">
                  {Math.floor(currentTime / 60).toString().padStart(2, '0')}:
                  {(currentTime % 60).toString().padStart(2, '0')} / 10:30
                </span>
                
                {/* Speed control */}
                <div className="flex gap-1">
                  {speeds.map((speed) => (
                    <Button
                      key={speed}
                      variant={playbackSpeed === speed ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setPlaybackSpeed(speed)}
                      className="text-xs"
                    >
                      {speed}x
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Transcript Panel */}
          <div className="w-80 border-l bg-card">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Phiên âm cuộc gọi</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[calc(85vh-120px)]">
              {sampleTranscript.map((item, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={item.speaker === 'Agent' ? 'default' : 'secondary'} className="text-xs">
                      {item.speaker === 'Agent' ? 'Tư vấn viên' : 'Khách hàng'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
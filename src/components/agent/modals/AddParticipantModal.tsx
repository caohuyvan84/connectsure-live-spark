import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, X } from "lucide-react";

interface AddParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddParticipantModal = ({ isOpen, onClose }: AddParticipantModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const availableParticipants = [
    { id: "agent_002", name: "Trần Văn Bình", role: "Tư vấn viên", isOnline: true },
    { id: "agent_003", name: "Nguyễn Thị Cúc", role: "Quản lý", isOnline: true },
    { id: "agent_004", name: "Lê Văn Dũng", role: "Chuyên viên eKYC", isOnline: false },
    { id: "dept_001", name: "Phòng Hỗ trợ Kỹ thuật", role: "Bộ phận", isOnline: true },
    { id: "agent_005", name: "Phạm Thị Em", role: "Tư vấn viên", isOnline: true },
    { id: "agent_006", name: "Hoàng Văn Phong", role: "Chuyên viên", isOnline: false }
  ];

  const filteredParticipants = availableParticipants.filter(participant =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddParticipant = (participantId: string, participantName: string) => {
    console.log(`Adding participant: ${participantName} (${participantId})`);
    // Add participant logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Thêm người tham gia</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm tên hoặc chức vụ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Participants list */}
          <div className="max-h-80 overflow-y-auto space-y-2">
            {filteredParticipants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{participant.name}</p>
                    <p className="text-xs text-muted-foreground">{participant.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={participant.isOnline ? "default" : "secondary"}
                    className={participant.isOnline ? "bg-success text-success-foreground" : ""}
                  >
                    {participant.isOnline ? "Online" : "Offline"}
                  </Badge>
                  <Button
                    size="sm"
                    disabled={!participant.isOnline}
                    onClick={() => handleAddParticipant(participant.id, participant.name)}
                  >
                    Thêm
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredParticipants.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Không tìm thấy kết quả phù hợp</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
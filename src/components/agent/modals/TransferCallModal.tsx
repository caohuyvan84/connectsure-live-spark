import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, X, PhoneForwarded } from "lucide-react";

interface TransferCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransferCallModal = ({ isOpen, onClose }: TransferCallModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const transferTargets = [
    { id: "agent_002", name: "Trần Văn Bình", role: "Tư vấn viên cấp cao", isOnline: true },
    { id: "agent_003", name: "Nguyễn Thị Cúc", role: "Quản lý nhóm", isOnline: true },
    { id: "agent_004", name: "Lê Văn Dũng", role: "Chuyên viên eKYC", isOnline: false },
    { id: "dept_001", name: "Phòng Hỗ trợ Kỹ thuật", role: "Bộ phận", isOnline: true },
    { id: "dept_002", name: "Phòng Bồi thường", role: "Bộ phận", isOnline: true },
    { id: "agent_007", name: "Vũ Thị Giang", role: "Chuyên viên bảo hiểm", isOnline: true }
  ];

  const filteredTargets = transferTargets.filter(target =>
    target.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    target.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTransferCall = (targetId: string, targetName: string) => {
    console.log(`Transferring call to: ${targetName} (${targetId})`);
    // Transfer call logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneForwarded className="h-4 w-4" />
              <span>Chuyển cuộc gọi</span>
            </div>
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
              placeholder="Tìm kiếm tên hoặc bộ phận..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Transfer targets list */}
          <div className="max-h-80 overflow-y-auto space-y-2">
            {filteredTargets.map((target) => (
              <div
                key={target.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{target.name}</p>
                    <p className="text-xs text-muted-foreground">{target.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={target.isOnline ? "default" : "secondary"}
                    className={target.isOnline ? "bg-success text-success-foreground" : ""}
                  >
                    {target.isOnline ? "Online" : "Busy"}
                  </Badge>
                  <Button
                    size="sm"
                    disabled={!target.isOnline}
                    onClick={() => handleTransferCall(target.id, target.name)}
                    className="bg-warning text-warning-foreground hover:bg-warning/90"
                  >
                    Chuyển
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTargets.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Không tìm thấy kết quả phù hợp</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
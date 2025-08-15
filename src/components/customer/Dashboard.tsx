import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/layout/Logo";
import { Calendar, Clock, Phone, History, User, FileText, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  onNavigateToCall: () => void;
  onLogout: () => void;
}

export const CustomerDashboard = ({ onNavigateToCall, onLogout }: DashboardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock appointment time (15:00, Friday, 15/08/2025)
  const appointmentTime = new Date();
  appointmentTime.setHours(15, 0, 0, 0);
  appointmentTime.setDate(appointmentTime.getDate() + 1); // Tomorrow

  const timeUntilAppointment = appointmentTime.getTime() - currentTime.getTime();
  const canJoinCall = timeUntilAppointment <= 5 * 60 * 1000; // 5 minutes before

  const handleQuickCall = () => {
    toast({
      title: "Đang kết nối...",
      description: "Chúng tôi đang tìm tư vấn viên có sẵn cho bạn",
    });
    setTimeout(() => {
      onNavigateToCall();
    }, 2000);
  };

  const handleJoinAppointment = () => {
    if (canJoinCall) {
      onNavigateToCall();
    } else {
      toast({
        title: "Chưa đến giờ hẹn",
        description: "Bạn có thể vào phòng gọi 5 phút trước giờ hẹn",
        variant: "destructive",
      });
    }
  };

  const activityHistory = [
    { id: 1, type: "Cuộc gọi", title: "Tư vấn sản phẩm An Tâm", date: "14/08/2025", status: "Hoàn thành" },
    { id: 2, type: "eKYC", title: "Xác thực danh tính", date: "10/08/2025", status: "Hoàn thành" },
    { id: 3, type: "Hợp đồng", title: "Ký hợp đồng điện tử", date: "10/08/2025", status: "Chờ xử lý" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Header */}
      <header className="bg-card border-b border-card-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="md" />
          <Button variant="outline" onClick={onLogout}>
            Đăng xuất
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Xin chào, Nguyễn Văn An!
          </h1>
          <p className="text-muted-foreground">
            {currentTime.toLocaleString('vi-VN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        {/* Next Appointment Card */}
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Calendar className="h-5 w-5" />
              Cuộc hẹn tiếp theo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">eKYC Hợp đồng An Tâm Trọn Vẹn</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>15:00, Thứ Sáu, 15/08/2025</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>với chuyên viên: <strong>Lê Thị Minh</strong></span>
              </div>
              <Badge variant={canJoinCall ? "default" : "secondary"} className="mt-2">
                {canJoinCall ? "Có thể vào phòng gọi" : "Chờ đến giờ hẹn"}
              </Badge>
            </div>
            <Button 
              variant={canJoinCall ? "call" : "outline"} 
              size="lg" 
              className="w-full"
              onClick={handleJoinAppointment}
              disabled={!canJoinCall}
            >
              Vào phòng gọi
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-2">Gọi hỗ trợ nhanh</h3>
                  <p className="text-sm text-muted-foreground">
                    Kết nối ngay với tư vấn viên
                  </p>
                </div>
                <Phone className="h-8 w-8 text-success" />
              </div>
              <Button variant="success" className="w-full mt-4" onClick={handleQuickCall}>
                <Phone className="h-4 w-4 mr-2" />
                Gọi ngay
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-2">Lịch sử hoạt động</h3>
                  <p className="text-sm text-muted-foreground">
                    Xem các giao dịch gần đây
                  </p>
                </div>
                <History className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4 space-y-2">
                {activityHistory.slice(0, 2).map((activity) => (
                  <div key={activity.id} className="flex justify-between text-sm">
                    <span>{activity.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Lịch sử hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityHistory.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.type} • {activity.date}</p>
                    </div>
                  </div>
                  <Badge variant={activity.status === "Hoàn thành" ? "default" : "secondary"}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border shadow-lg md:hidden">
        <div className="grid grid-cols-4 gap-1">
          {[
            { icon: Home, label: "Trang chủ", active: true },
            { icon: Calendar, label: "Lịch hẹn", active: false },
            { icon: FileText, label: "Hợp đồng", active: false },
            { icon: User, label: "Tài khoản", active: false },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center gap-1 py-3 px-2 transition-colors ${
                item.active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
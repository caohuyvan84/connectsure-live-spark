import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/layout/Logo";
import { Users, Smartphone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4">
      <div className="text-center space-y-8 max-w-4xl">
        <div className="space-y-4">
          <Logo size="lg" className="justify-center" />
          <h1 className="text-4xl font-bold text-foreground">
            Nền tảng Video Call Bảo hiểm
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kết nối khách hàng với tư vấn viên qua video call an toàn, 
            hỗ trợ eKYC và ký hợp đồng điện tử
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="hover:shadow-lg transition-shadow border-primary/20">
            <CardHeader className="text-center">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Dành cho Khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Tham gia cuộc gọi video với tư vấn viên, thực hiện eKYC và ký hợp đồng trực tuyến
              </p>
              <Button 
                variant="brand" 
                size="lg" 
                className="w-full"
                onClick={() => window.location.href = '/customer'}
              >
                Đăng nhập Khách hàng
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-success/20">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-success mx-auto mb-4" />
              <CardTitle>Dành cho Tư vấn viên</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Quản lý cuộc gọi, hỗ trợ khách hàng eKYC và theo dõi quy trình bảo hiểm
              </p>
              <Button 
                variant="success" 
                size="lg" 
                className="w-full"
                onClick={() => window.location.href = '/agent'}
              >
                Đăng nhập Agent
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-sm text-muted-foreground mt-8">
          <p>Demo app - Sử dụng bất kỳ thông tin nào để đăng nhập</p>
          <p>Agent: admin/admin | Customer: bất kỳ thông tin nào</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

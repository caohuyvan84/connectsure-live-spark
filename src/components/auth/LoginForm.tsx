import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/layout/Logo";
import { authService, type LoginCredentials } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  onLogin: (userRole: 'customer' | 'agent') => void;
  userType: 'customer' | 'agent';
}

export const LoginForm = ({ onLogin, userType }: LoginFormProps) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authService.login(credentials);
      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng ${user.name}!`,
      });
      onLogin(user.role);
    } catch (error) {
      toast({
        title: "Lỗi đăng nhập",
        description: "Vui lòng kiểm tra lại thông tin đăng nhập",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!credentials.username) {
      toast({
        title: "Vui lòng nhập email hoặc số điện thoại",
        variant: "destructive",
      });
      return;
    }

    try {
      await authService.resetPassword(credentials.username);
      toast({
        title: "Đã gửi link reset mật khẩu",
        description: "Vui lòng kiểm tra email của bạn",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể gửi link reset mật khẩu",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4">
      <Card className="w-full max-w-md border-card-border shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <Logo size="lg" className="justify-center" />
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {userType === 'agent' ? 'Đăng nhập Agent' : 'Đăng nhập ConnectSure'}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {userType === 'agent' 
                ? 'Truy cập hệ thống tư vấn viên' 
                : 'Chào mừng bạn quay trở lại'
              }
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">
                {userType === 'agent' ? 'Tên đăng nhập' : 'Số điện thoại hoặc Email'}
              </Label>
              <Input
                id="username"
                type="text"
                placeholder={userType === 'agent' ? 'admin' : 'Nhập email hoặc số điện thoại'}
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder={userType === 'agent' ? 'admin' : 'Nhập mật khẩu'}
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <Button 
              type="submit" 
              variant="brand" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Đăng nhập
            </Button>
            
            <Button
              type="button"
              variant="link"
              className="w-full text-muted-foreground hover:text-primary"
              onClick={handleForgotPassword}
            >
              Quên mật khẩu?
            </Button>
          </form>
          
          {userType === 'customer' && (
            <div className="mt-6 text-center text-xs text-muted-foreground">
              Bằng việc đăng nhập, bạn đồng ý với{" "}
              <a href="#" className="text-primary hover:underline">Điều khoản sử dụng</a>
              {" "}và{" "}
              <a href="#" className="text-primary hover:underline">Chính sách bảo mật</a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
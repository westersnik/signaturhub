import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin credentials
    if (email === "Admin" && password === "Admin") {
      navigate("/dashboard");
      return;
    }

    // For demo, we'll just redirect based on email domain
    if (email.includes("company")) {
      navigate("/dashboard");
    } else {
      navigate("/driver");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 bg-white shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Digital Link</h1>
          <p className="text-gray-600 mt-2">Sign in to manage shipments</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Index;
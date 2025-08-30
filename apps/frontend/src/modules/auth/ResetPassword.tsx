import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const [, setCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    setCookie("accessToken", token);
  }, [token, setCookie]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userInfo = {
      id,
      password,
    };

    try {
      setLoading(true);
      const res = await resetPassword(userInfo);

      if (!res.data) {
        throw new Error("Failed to reset password. The link may be expired.");
      }
      toast.success("Password Reset Successfully!");

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // redirect after success
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <p className="text-center text-green-600">
              Password has been reset. Redirecting to login...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;

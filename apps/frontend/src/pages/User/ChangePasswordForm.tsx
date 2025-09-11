import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import {
  passwordSchema,
  type PasswordFormValues,
} from "@/types/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const ChangePasswordForm = () => {
  const [changePassword] = useChangePasswordMutation();

  // State for password visibility
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current: "",
      new: "",
      confirm: "",
    },
  });

  const handlePasswordChange = async (data: PasswordFormValues) => {
    const userData = {
      oldPassword: data.current,
      password: data.new,
    };
    try {
      const res = await changePassword(userData).unwrap();
      if (res.success) {
        toast.success("Password Changed");
        passwordForm.reset();
      }
    } catch {
      toast.error("Password Change Failed!");
    }
  };

  return (
    <FormProvider {...passwordForm}>
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
          className="space-y-4"
        >
          <FormField
            control={passwordForm.control}
            name="current"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="current-password">
                  Current Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      id="current-password"
                      type={showPassword.current ? "text" : "password"}
                      className={cn(
                        "pl-10 pr-10",
                        fieldState.error ? "border-destructive" : "",
                      )}
                      placeholder="Enter current password"
                      {...field}
                      value={field.value || ""}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 transform"
                      onClick={() => togglePasswordVisibility("current")}
                      aria-label={
                        showPassword.current ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword.current ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="new"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="new-password">New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      id="new-password"
                      type={showPassword.new ? "text" : "password"}
                      className={cn(
                        "pl-10 pr-10",
                        fieldState.error ? "border-destructive" : "",
                      )}
                      placeholder="Enter new password"
                      {...field}
                      value={field.value || ""}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 transform"
                      onClick={() => togglePasswordVisibility("new")}
                      aria-label={
                        showPassword.new ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword.new ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="confirm"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="confirm-password">
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      id="confirm-password"
                      type={showPassword.confirm ? "text" : "password"}
                      className={cn(
                        "pl-10 pr-10",
                        fieldState.error ? "border-destructive" : "",
                      )}
                      placeholder="Confirm new password"
                      {...field}
                      value={field.value || ""}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 transform"
                      onClick={() => togglePasswordVisibility("confirm")}
                      aria-label={
                        showPassword.confirm ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword.confirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-muted rounded-lg p-4">
            <h4 className="mb-2 font-medium">Password Requirements:</h4>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>• At least 8 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer md:w-auto"
            disabled={passwordForm.formState.isSubmitting}
          >
            Change Password
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ChangePasswordForm;

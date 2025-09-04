import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingCircle from "@/components/ui/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Phone, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ProfileManagement = () => {
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);

  // Profile form schema and setup
  const profileSchema = z.object({
    userName: z.string().min(2, "Full Name is required"),
    phone: z
      .string()
      .min(7, "Phone number is too short")
      .max(20, "Phone number is too long"),
    email: z.string().email("Invalid email address"),
  });

  type ProfileFormValues = z.infer<typeof profileSchema>;

  // Use state to store initial values and update form when userInfo loads
  const [profileDefaults, setProfileDefaults] = useState<ProfileFormValues>({
    userName: "",
    phone: "",
    email: "",
  });

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileDefaults,
  });

  // Update form values when userInfo loads
  useEffect(() => {
    if (userInfo?.data) {
      setProfileDefaults({
        userName: userInfo.data.userName || "",
        phone: userInfo.data.phone || "",
        email: userInfo.data.email || "",
      });
      profileForm.reset({
        userName: userInfo.data.userName || "",
        phone: userInfo.data.phone || "",
        email: userInfo.data.email || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const onSubmit = (data: ProfileFormValues) => {
    // TODO: call api with data
    console.log(data);
    toast.success("Profile Update");
  };

  // Password change form
  const passwordSchema = z
    .object({
      current: z.string().min(1, "Current password is required"),
      new: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain uppercase letter")
        .regex(/[a-z]/, "Must contain lowercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
      confirm: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.new === data.confirm, {
      message: "Passwords do not match",
      path: ["confirm"],
    });

  type PasswordFormValues = z.infer<typeof passwordSchema>;

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current: "",
      new: "",
      confirm: "",
    },
  });

  const handlePasswordChange = (data: PasswordFormValues) => {
    // TODO: call password change API
    console.log(data);
    toast.success("Password Changed");
    passwordForm.reset();
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Management
        </CardTitle>
        <CardDescription>
          Manage your account information and settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <FormProvider {...profileForm}>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onSubmit)}
                  className="space-y-0"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="userName"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel htmlFor="name">Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                              <Input
                                id="name"
                                className={cn(
                                  "pl-10",
                                  fieldState.error ? "border-destructive" : "",
                                )}
                                autoComplete="off"
                                {...field}
                                value={field.value || ""}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel htmlFor="phone">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                              <Input
                                id="phone"
                                className={cn(
                                  "pl-10",
                                  fieldState.error ? "border-destructive" : "",
                                )}
                                autoComplete="off"
                                {...field}
                                value={field.value || ""}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel htmlFor="email">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                              <Input
                                id="email"
                                type="email"
                                className={cn(
                                  "pl-10",
                                  fieldState.error ? "border-destructive" : "",
                                )}
                                autoComplete="off"
                                {...field}
                                value={field.value || ""}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-4 w-full md:w-auto"
                    disabled={profileForm.formState.isSubmitting}
                  >
                    Save Changes
                  </Button>
                </form>
              </Form>
            </FormProvider>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
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
                              type="password"
                              className={cn(
                                "pl-10",
                                fieldState.error ? "border-destructive" : "",
                              )}
                              placeholder="Enter current password"
                              {...field}
                              value={field.value || ""}
                            />
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
                        <FormLabel htmlFor="new-password">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                            <Input
                              id="new-password"
                              type="password"
                              className={cn(
                                "pl-10",
                                fieldState.error ? "border-destructive" : "",
                              )}
                              placeholder="Enter new password"
                              {...field}
                              value={field.value || ""}
                            />
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
                              type="password"
                              className={cn(
                                "pl-10",
                                fieldState.error ? "border-destructive" : "",
                              )}
                              placeholder="Confirm new password"
                              {...field}
                              value={field.value || ""}
                            />
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
                    className="w-full md:w-auto"
                    disabled={passwordForm.formState.isSubmitting}
                  >
                    Change Password
                  </Button>
                </form>
              </Form>
            </FormProvider>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileManagement;

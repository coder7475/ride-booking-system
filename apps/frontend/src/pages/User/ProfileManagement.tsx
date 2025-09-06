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
import {
  useUpdateUserMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { profileSchema, type ProfileFormValues } from "@/types/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import ChangePasswordForm from "./ChangePasswordForm";

const ProfileManagement = () => {
  const { data: userInfo, isLoading } = useUserInfoQuery(undefined);
  const [userUpdate] = useUpdateUserMutation();

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
  }, [userInfo]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const res = await userUpdate(data).unwrap();
      // console.log(res);
      if (res.success) {
        toast.success("Profile Update Successfully!");
      }
    } catch {
      toast.error("Profile Update Failed!");
    }
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
                    className="mt-4 w-full cursor-pointer md:w-auto"
                    disabled={profileForm.formState.isSubmitting}
                  >
                    Save Changes
                  </Button>
                </form>
              </Form>
            </FormProvider>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <ChangePasswordForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileManagement;

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Car, FileText, Lock, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";

const DriverProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: "David Chen",
    email: "david.chen@email.com",
    phone: "+1-555-123-4567",
    licenseNumber: "DL123456789",
    yearsExperience: "5",
  });

  const [vehicle, setVehicle] = useState({
    make: "Toyota",
    model: "Camry",
    year: "2020",
    color: "Silver",
    plateNumber: "ABC123",
    insuranceExpiry: "2024-12-31",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileUpdate = () => {
    toast("Profile Updated\nYour driver profile has been saved successfully.");
  };

  const handleVehicleUpdate = () => {
    toast(
      "Vehicle Information Updated\nYour vehicle details have been saved successfully.",
    );
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error(
        "Password Mismatch\nNew password and confirmation don't match.",
      );
      return;
    }

    toast.success(
      "Password Changed\nYour password has been updated successfully.",
    );
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Driver Profile Management
        </CardTitle>
        <CardDescription>
          Manage your driver account and vehicle information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Personal Info</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle Details</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-lg">DC</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
                <p className="text-muted-foreground mt-1 text-xs">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>

            {/* Personal Information Form */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">Driver's License Number</Label>
                <div className="relative">
                  <FileText className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    id="license"
                    value={profile.licenseNumber}
                    onChange={(e) =>
                      setProfile({ ...profile, licenseNumber: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select
                  value={profile.yearsExperience}
                  onValueChange={(value) =>
                    setProfile({ ...profile, yearsExperience: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="2">2 years</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="4">4 years</SelectItem>
                    <SelectItem value="5">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
              Save Personal Information
            </Button>
          </TabsContent>

          <TabsContent value="vehicle" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="make">Vehicle Make</Label>
                <Input
                  id="make"
                  value={vehicle.make}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, make: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Vehicle Model</Label>
                <Input
                  id="model"
                  value={vehicle.model}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, model: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={vehicle.year}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, year: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={vehicle.color}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, color: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plate">License Plate Number</Label>
                <Input
                  id="plate"
                  value={vehicle.plateNumber}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, plateNumber: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance Expiry Date</Label>
                <Input
                  id="insurance"
                  type="date"
                  value={vehicle.insuranceExpiry}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, insuranceExpiry: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h4 className="mb-2 flex items-center gap-2 font-medium">
                <Car className="h-4 w-4" />
                Vehicle Summary
              </h4>
              <p className="text-muted-foreground text-sm">
                {vehicle.year} {vehicle.color} {vehicle.make} {vehicle.model} •
                Plate: {vehicle.plateNumber}
              </p>
            </div>

            <Button onClick={handleVehicleUpdate} className="w-full md:w-auto">
              Save Vehicle Information
            </Button>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    id="current-password"
                    type="password"
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    id="new-password"
                    type="password"
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

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
                onClick={handlePasswordChange}
                className="w-full md:w-auto"
                disabled={
                  !passwords.current || !passwords.new || !passwords.confirm
                }
              >
                Change Password
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DriverProfileManagement;

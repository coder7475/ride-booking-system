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
import { DriverFormSchema, type DriverFormValues } from "@/types/driver.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function DriverForm({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  const form = useForm<DriverFormValues>({
    resolver: zodResolver(DriverFormSchema),
    defaultValues: {
      vehicleInfo: {
        vehicleType: "",
        brand: "",
        model: "",
        year: 2020,
        plateNumber: "",
      },
      driverLocation: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<DriverFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      // Use Geolocation API to get driver's current location
      if ("geolocation" in navigator) {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => resolve(pos),
              (error) => {
                toast.error(
                  "Failed to get your location. Please allow location access.",
                );
                reject(error);
              },
            );
          },
        );
        const { latitude, longitude } = position.coords;
        // Attach location to data
        data.driverLocation = {
          latitude,
          longitude,
        };
      } else {
        toast.error("Geolocation is not supported by your browser.");
        setIsSubmitting(false);
        return;
      }
      console.log(data);
      // Here you would send data (including driverLocation) to your backend API for driver application
      // For demonstration, just show a toast and reset
      toast.success("Driver application submitted!");
      form.reset();
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="mb-2 text-lg font-semibold">
                Vehicle Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vehicleInfo.vehicleType"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="vehicleType">Vehicle Type</FormLabel>
                      <FormControl>
                        <select
                          id="vehicleType"
                          {...field}
                          value={field.value ?? ""}
                          className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none ${
                            fieldState.error ? "border-destructive" : ""
                          }`}
                        >
                          <option value="" disabled>
                            Select vehicle type
                          </option>
                          <option value="Car">Car</option>
                          <option value="Motorcycle">Motorcycle</option>
                          <option value="Van">Van</option>
                          <option value="Truck">Truck</option>
                          <option value="Bicycle">Bicycle</option>
                          {/* Add more options as needed */}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleInfo.brand"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="brand">Brand</FormLabel>
                      <FormControl>
                        <Input
                          id="brand"
                          type="text"
                          placeholder="e.g. Toyota"
                          {...field}
                          value={field.value ?? ""}
                          className={
                            fieldState.error ? "border-destructive" : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleInfo.model"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="model">Model</FormLabel>
                      <FormControl>
                        <Input
                          id="model"
                          type="text"
                          placeholder="e.g. Corolla"
                          {...field}
                          value={field.value ?? ""}
                          className={
                            fieldState.error ? "border-destructive" : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleInfo.year"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="year">Year</FormLabel>
                      <FormControl>
                        <Input
                          id="year"
                          type="number"
                          placeholder="e.g. 2020"
                          {...field}
                          value={field.value ?? ""}
                          className={
                            fieldState.error ? "border-destructive" : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleInfo.plateNumber"
                  render={({ field, fieldState }) => (
                    <FormItem className="col-span-2">
                      <FormLabel htmlFor="plateNumber">Plate Number</FormLabel>
                      <FormControl>
                        <Input
                          id="plateNumber"
                          type="text"
                          placeholder="e.g. DHK-5487"
                          {...field}
                          value={field.value ?? ""}
                          className={
                            fieldState.error ? "border-destructive" : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="group w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              <span className="ml-2">
                <svg
                  className="inline h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

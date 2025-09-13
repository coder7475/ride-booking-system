import { DriverForm } from "@/modules/driver/DriverForm";

const DriverApplication = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-primary mb-2 text-center text-2xl font-bold">
          Apply to Become a Driver
        </h1>
        <p className="text-muted-foreground mb-6 text-center">
          Please provide your vehicle information and allow geolocation access
          to complete your driver application.
        </p>
        <DriverForm />
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            After you apply, please wait patiently for admin approval.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverApplication;

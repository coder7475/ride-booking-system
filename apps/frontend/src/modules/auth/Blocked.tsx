import { useLocation } from "react-router";

const Blocked = () => {
  const location = useLocation();
  const accountStatus = location.state?.status;

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-5xl font-bold text-red-500">
        {accountStatus === "blocked" ? "Blocked" : "Suspended"}
      </h1>
      <h2 className="mb-2 text-2xl font-semibold">
        {accountStatus === "blocked"
          ? "Your account has been blocked."
          : "Your account has been suspended."}
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        If you believe this is a mistake or need further assistance, please
        contact us at{" "}
        <a
          href="mailto:contact@robiulhossain.com"
          className="text-primary hover:text-primary/80 underline"
        >
          contact@robiulhossain.com
        </a>
        .
      </p>
      <a
        href="/"
        className="bg-primary hover:bg-primary/90 rounded-xl px-6 py-2 text-white transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default Blocked;

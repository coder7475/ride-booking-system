const Unauthorized = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-5xl font-bold text-red-500">403</h1>
      <h2 className="mb-2 text-2xl font-semibold">Unauthorized Access</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        You do not have permission to view this dashboard. Please contact the
        administrator if you believe this is a mistake.
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

export default Unauthorized;

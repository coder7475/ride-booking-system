const LoadingCircle = () => {
  return (
    <div className="flex items-center justify-center py-8 text-gray-500">
      <span className="mr-2 animate-spin">
        <svg className="text-primary h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </span>
      Estimating fare...
    </div>
  );
};

export default LoadingCircle;

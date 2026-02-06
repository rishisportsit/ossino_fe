const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-center text-status-error-200 mb-2 text-xl leading-6 font-bold tracking-tight">
        {message}
      </h3>
      <p className="text-center max-w-[330px] text-sm text-base-200 leading-[18px] mx-auto">
        Try again later
      </p>
    </div>
  );
};

export default ErrorMessage;

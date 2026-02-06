import { Button } from 'components/shared/ui/Button';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="px-4 xl:px-5 absolute w-full left-0 ">
      <div className="xl:bg-base-800 xl:rounded-[12px]  flex justify-center items-center h-[calc(100vh-40px)] my-5">
        <div
          className="flex flex-col px-4 justify-center items-center w-[343px] lg:w-[567px] py-[150px] text-center "
        >
          <p className="text-xs font-normal text-base-400 xl:text-base pb-8">
            {error?.toString()}
          </p>
          <Button
            onClick={() => navigate("/")}
            className="text-base-900 text-sm"
          >
            Go to Home Page
          </Button>
        </div>
      </div>
    </div>
  )
};

export default ErrorBoundary;

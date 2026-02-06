import { Button } from 'components/shared/ui/Button';
import { useNavigate } from 'react-router-dom';

const Error404Page = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 xl:px-5 ">
      <div className="xl:bg-base-800 xl:rounded-[12px] flex justify-center items-center h-[calc(100vh-150px)] xl:h-[calc(100vh-110px)]">
        <div className="flex flex-col px-4 justify-center items-center w-[343px] lg:w-[567px] text-center">
          <h1 className="text-[72px] text-primary-1 pb-4">404</h1>
          <h3 className="text-xl font-medium xl:text-2xl pb-3">
            This page not found
          </h3>
          <p className="text-xs font-normal text-base-400 xl:text-base pb-8">
            The page you are looking for might be renamed, removed or might
            never exist on this website.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="text-base-900 text-sm"
          >
            Go to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;

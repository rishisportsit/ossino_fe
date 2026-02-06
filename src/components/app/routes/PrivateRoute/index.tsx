import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/index';

const PrivateRoute = () => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const loading = useAppSelector((state) => state.user.loading);

  if (loading && !loggedIn) {
    return <div>Loading...</div>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

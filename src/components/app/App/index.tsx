import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routes from 'components/app/routes/Routes';
import { store, persistor } from 'store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from 'config/index';

const { googleClientId } = config;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      staleTime: 5 * 60 * 1000, 
      gcTime: 10 * 60 * 1000,
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;

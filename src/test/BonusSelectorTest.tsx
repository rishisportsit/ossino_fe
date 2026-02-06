import BonusSelector from '../components/features/auth/BonusSelector';
import { FormProvider, useForm } from 'react-hook-form';
import { Provider } from 'react-redux';
import { store } from '../store';

// Test component to verify the BonusSelector works with the new API
const BonusSelectorTest = () => {
  const methods = useForm({
    defaultValues: {
      promocode: '',
    },
  });

  return (
    <Provider store={store}>
      <FormProvider {...methods}>
        <div className="bg-base-800 p-6 rounded-lg max-w-md mx-auto mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-yellow-400 rounded-full flex items-center justify-center">
              <img src="/icons/gift.svg" alt="Gift" width={24} height={24} />
            </div>
            <div>
              <h2 className="body-txtColor-1 font-bold text-xl">We have a surprise for you</h2>
              <p className="text-base-300 text-sm">
                We give a bonus for the first deposit of the account.
              </p>
            </div>
          </div>
          
          <BonusSelector 
            onDialogClose={() => {}}
            useNewBonusSystem={true}
          />
        </div>
      </FormProvider>
    </Provider>
  );
};

export default BonusSelectorTest;
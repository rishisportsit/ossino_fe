# Post-Registration Bonus Integration Documentation

This documentation explains how the bonus selection and post-registration redirect system works.

## Overview

When a user selects a bonus during registration, the system:

1. **Stores the bonus selection** in localStorage
2. **Completes registration and login**
3. **Automatically redirects** to the deposit page if a bonus was selected
4. **Preserves bonus information** for the deposit flow

## Implementation Details

### 1. Bonus Selection Storage

When user confirms bonus selection in `SelectBonusButton`:

```typescript
// Automatically stores selected bonus
storeSelectedBonus(selectedBonus);
setPendingBonusRedirect(); // If bonus is not "none"
```

**Storage Structure:**
```typescript
interface StoredBonusSelection {
  bonusOptionId: string | number;
  bonusType: 'SPORTS' | 'CASINO' | 'NONE';
  actualBonusId: number | null;
  selectedAt: string; // ISO timestamp
  bonusDetails?: {
    title: string;        // "Sport Bonus +100%"
    description: string;  // "Up to $1,000"
    percentage?: number;  // 100
    maxAmount?: number;   // 1000
  };
}
```

### 2. Registration Flow Integration

The registration process now includes bonus handling:

```typescript
// In user slice
export const register = createAppAsyncThunk(
  'user/register',
  async (data, { dispatch }) => {
    await AuthApi.register(data);
    await dispatch(login({ /* credentials */ }));
    
    // Signal post-registration actions
    dispatch(handlePostRegistrationActions());
  }
);
```

### 3. Automatic Redirect Logic

The `usePostRegistrationRedirect` hook handles the redirect:

```typescript
// In MainLayout component
usePostRegistrationRedirect(); // Automatically handles redirect

// Hook logic:
useEffect(() => {
  if (isFromRegistration) {
    dispatch(clearRegistrationFlag());
    handlePostRegistrationRedirect(navigate, defaultRoute);
  }
}, [isFromRegistration, navigate, dispatch, defaultRoute]);
```

### 4. Deposit Page Integration

**Route:** `/transactions?tab=deposit`

**State passed to deposit page:**
```typescript
navigate(ROUTES.deposit, {
  state: {
    fromRegistration: true,
    selectedBonus: storedBonus,
    message: `Complete your ${bonusTitle} by making your first deposit!`
  }
});
```

## Usage on Deposit Page

### Accessing Bonus Information

```typescript
import { useLocation } from 'react-router-dom';
import { getBonusForDepositPage } from 'helpers/navigationHelpers';

const DepositPage = () => {
  const location = useLocation();
  const bonusInfo = getBonusForDepositPage();
  
  // Check if user came from registration
  const isFromRegistration = location.state?.fromRegistration;
  const welcomeMessage = location.state?.message;
  
  if (bonusInfo && isFromRegistration) {
    return (
      <div className="bonus-welcome">
        <h2>{welcomeMessage}</h2>
        <div className="bonus-details">
          <h3>{bonusInfo.title}</h3>
          <p>{bonusInfo.description}</p>
          <p>Bonus ID: {bonusInfo.id}</p>
          <p>Type: {bonusInfo.type}</p>
        </div>
        {/* Deposit form with bonus pre-applied */}
      </div>
    );
  }
  
  // Regular deposit page
  return <RegularDepositForm />;
};
```

### Clearing Bonus Data

```typescript
import { clearBonusRedirectData } from 'helpers/navigationHelpers';

// Call when deposit is completed or user cancels bonus
const handleDepositComplete = () => {
  clearBonusRedirectData(); // Clears localStorage
  // Continue with success flow
};

const handleCancelBonus = () => {
  clearBonusRedirectData(); // Clears localStorage
  // Show regular deposit form
};
```

## Storage Management

### Helper Functions Available

```typescript
// Check if user has active bonus selection
const hasBonus = hasActiveBonusSelection();

// Get bonus for display
const bonusInfo = getBonusForDepositPage();

// Clear all bonus data
clearBonusRedirectData();

// Check redirect status
const shouldRedirect = shouldRedirectToDeposit();
```

### LocalStorage Keys Used

```typescript
{
  selectedBonus: 'selectedBonus',           // Bonus selection data
  pendingBonusRedirect: 'pendingBonusRedirect' // Redirect flag
}
```

## Error Handling

The system gracefully handles errors:

- **Invalid bonus data**: Clears localStorage and continues normally
- **Navigation errors**: Falls back to default route (home page)
- **Missing deposit page**: Can be configured with different route

## Testing the Flow

1. **Select a bonus** during registration
2. **Complete registration** form
3. **Verify redirect** to deposit page with bonus info
4. **Check localStorage** for stored bonus data
5. **Test deposit completion** clears the data

## Configuration

### Customizing Deposit Route

```typescript
// In constants/routes.ts
export const ROUTES = {
  deposit: '/your-custom-deposit-route',
};
```

### Customizing Default Redirect

```typescript
// Pass custom default route
usePostRegistrationRedirect('/custom-home'); 
```

## Security Considerations

- Bonus data is stored in **localStorage only**
- No sensitive information is persisted
- Data is **cleared after use** or on logout
- **Server validation** should verify bonus eligibility

## Integration Checklist

- [ ] Deposit page reads `location.state` for registration context
- [ ] Deposit page displays bonus information prominently
- [ ] Bonus is pre-applied to deposit form
- [ ] Deposit completion clears bonus data
- [ ] Cancel/back navigation handles bonus cleanup
- [ ] Server-side validates bonus application
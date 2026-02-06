import React from 'react';

/**
 * Simplified BetConfigProvider - now that we use localStorage only,
 * components can directly use the useBetConfig hook when needed.
 * This provider is kept for compatibility but doesn't need to do anything.
 */
const BetConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default BetConfigProvider;
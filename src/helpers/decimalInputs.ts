// used to prevent User of entering invalid data to all inputs, which values supposed to be Decimal (e.g. Withdraw, Send, Tip)

export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !/[0-9.,]/.test(e.key) &&
    e.key !== 'Backspace' &&
    e.key !== 'Delete' &&
    e.key !== 'ArrowLeft' &&
    e.key !== 'ArrowRight'
  ) {
    e.preventDefault();
  }
};

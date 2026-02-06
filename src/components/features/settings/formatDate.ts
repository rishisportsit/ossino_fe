import { format, formatDistanceToNow, differenceInDays } from 'date-fns';

export const formatDate = (date: Date) => {
  const daysDifference = differenceInDays(new Date(), date);

  if (daysDifference <= 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return format(date, 'MMMM d, yyyy');
};

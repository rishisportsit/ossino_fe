import type { PropsWithChildren } from 'react';

import infoIcon from '/icons/infoWhite.svg?url';
import Icon from 'components/shared/Icon';

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-status-error-200 py-2.5 px-3.5 rounded-lg text-10px flex items-center gap-1">
      <Icon id="infoIconWhite" href={infoIcon} className="w-4 h-4 fill-1" />
      {children}
    </div>
  );
};

export default ErrorMessage;

import Markdown from 'react-markdown';
import { cn } from 'helpers/ui';

import styles from './index.module.css';

type NotificationMarkdownProps = {
  children: string;
};

const NotificationMarkdown = ({ children }: NotificationMarkdownProps) => {
  return (
    <Markdown className={cn('markdown', styles['notification-markdown'])}>
      {children}
    </Markdown>
  );
};

export default NotificationMarkdown;

import { Toaster as Sonner } from 'sonner';
import Warning2Icon from 'assets/icons/Warning2Icon';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'pointer-events-auto group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          title: "ml-2 -mt-[1.5px]"
        },
      }}
      {...props}
      icons={{ error: <Warning2Icon className="w-6 h-6" /> }}
    />
  );
};

export {
  Toaster 
};

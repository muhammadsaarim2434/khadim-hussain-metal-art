import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold uppercase tracking-wider ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-gold text-ink shadow-sm hover:bg-gold-600 hover:shadow-md hover:-translate-y-0.5',
        secondary:
          'bg-brown text-white hover:bg-brown-dark hover:-translate-y-0.5',
        outline:
          'border border-ink/20 bg-transparent text-ink hover:border-gold hover:text-gold-600',
        ghost: 'hover:bg-muted text-ink',
        dark: 'bg-ink text-white hover:bg-ink-800 hover:-translate-y-0.5',
        link: 'text-gold-600 underline-offset-4 hover:underline rounded-none px-0',
      },
      size: {
        default: 'h-11 px-7 py-2',
        sm: 'h-9 px-5',
        lg: 'h-14 px-9 text-[15px]',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  ...props
}) => {

  const baseClasses = "relative overflow-hidden group font-display font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 transform active:scale-[0.98]";

  const variants = {
    primary: "bg-primary text-white border border-primary/50 hover:bg-red-600 shadow-[0_0_20px_rgba(255,0,51,0.3)] hover:shadow-[0_0_40px_rgba(255,0,51,0.6)] skew-x-[-10deg]",
    outline: "bg-transparent text-white border border-white/20 hover:border-primary/50 hover:text-primary hover:bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] skew-x-[-10deg]"
  };

  const sizes = {
    sm: "h-10 px-6 text-xs",
    md: "h-12 px-8 text-sm",
    lg: "h-14 px-10 text-base"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Skew fix for content */}
      <div className="flex items-center gap-2 skew-x-[10deg]">
        {icon && <span className="material-symbols-outlined text-[1.2em] relative z-10">{icon}</span>}
        <span className="relative z-10">{children}</span>
      </div>

      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-x-[10deg]"></div>
    </button>
  );
};

export default Button;
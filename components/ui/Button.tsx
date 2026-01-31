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
  
  const baseClasses = "font-bold tracking-wider transition-all flex items-center justify-center gap-3 transform active:scale-[0.98] relative overflow-hidden group rounded-lg";
  
  const variants = {
    primary: "bg-white text-black hover:bg-secondary hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] duration-300",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/50 backdrop-blur-md duration-300"
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
      {icon && <span className="material-symbols-outlined text-[1.2em] relative z-10">{icon}</span>}
      <span className="uppercase font-display relative z-10">{children}</span>
    </button>
  );
};

export default Button;
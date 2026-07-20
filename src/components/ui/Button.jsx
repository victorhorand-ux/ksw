import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/20';
  
  const variants = {
    // 🚀 Restored the premium blue gradient with a matching colored shadow
    primary: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 shadow-[0_8px_16px_rgba(2,132,199,0.2)] hover:shadow-[0_10px_20px_rgba(2,132,199,0.3)]',
    
    // Kept the light blue secondary for subtle actions (like Add to Cart)
    secondary: 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200',
    
    // 🚀 Updated hover state to match the blue theme instead of gray
    outline: 'border border-slate-200 text-slate-700 hover:border-sky-500 hover:text-sky-700 hover:bg-sky-50 bg-white',
    
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-md hover:shadow-lg',
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm rounded-xl',
    md: 'py-3.5 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
    icon: 'w-14 h-14 rounded-xl', // Perfect for mobile icon buttons
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <button 
      type={type} 
      className={classes} 
      disabled={disabled || isLoading} 
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}
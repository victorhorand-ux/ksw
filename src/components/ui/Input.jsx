import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-bold text-slate-900 mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={`w-full bg-white border ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'} rounded-2xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-200 ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm font-bold text-red-500" role="alert">{error}</p>}
      {helperText && !error && <p className="mt-2 text-sm font-medium text-slate-500">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
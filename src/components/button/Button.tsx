import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  status: string;
  color: 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-neutral' | 'btn-ghost';
  outline: boolean;
};

function Button({ children, status, color, outline }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={status === 'loading'}
      className={`mt-10 ml-auto mr-0 btn ${outline ? 'btn-outline' : ''} ${color}`}
    >
      {status === 'loading' && <span className="loading loading-spinner" />}
      {status === 'loading' ? 'loading' : `${children}`}
    </button>
  );
}

export default Button;

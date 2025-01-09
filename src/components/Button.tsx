import { FormEvent, ReactNode } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
  type?: ButtonType;
}

function Button({ children, onClick, type = 'button' }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} onSubmit={onClick} className="button">
      {children}
    </button>
  );
}

export default Button;

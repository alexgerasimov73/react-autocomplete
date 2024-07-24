import { InputHTMLAttributes } from 'react';
import { Spinner } from '../Spinner/Spinner';
import './InputWithSpinner.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  readonly isLoading?: boolean;
}

export const InputWithSpinner = ({ isLoading, ...props }: Props) => (
  <div className="InputWithSpinner">
    <input type="text" className="InputWithSpinner-Field" {...props} />

    {isLoading && (
      <span className="InputWithSpinner-Spinner">
        <Spinner />
      </span>
    )}
  </div>
);

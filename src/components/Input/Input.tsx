import { FC } from 'react';

import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loader?: JSX.Element;
}

export const Input: FC<InputProps> = ({ loader, ...props }) => (
  <div className='Input'>
    <input className='Input__field' {...props} />
    {loader && <span className='Input__loader'>{loader}</span>}
  </div>
);

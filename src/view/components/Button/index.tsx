import { FC, memo } from 'react';
import styles from './styles.module.scss';

interface ButtonProps {
  children: string;
  onClick: () => void;
  type: 'primary' | 'secondary';
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type,
  className = '',
}) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${styles[type]} ${className}`}
  >
    {children}
  </button>
);

export default memo(Button);

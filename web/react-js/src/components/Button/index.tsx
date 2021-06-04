import React from 'react';
import { IconType } from 'react-icons';

import { Container } from './styles';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType;
  iconAlign?: 'left' | 'right';
  backgroundColor?: string;
  iconSize?: number;
}

const Button: React.FC<IButtonProps> = ({
  children,
  icon: Icon,
  iconAlign,
  iconSize,
  backgroundColor,
  ...rest
}) => (
  <Container
    {...rest}
    iconAlign={iconAlign ?? 'right'}
    backgroundColor={backgroundColor}
  >
    {children}
    {Icon && <Icon size={iconSize ?? 20} />}
  </Container>
);

export { Button };

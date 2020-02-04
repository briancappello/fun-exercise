/* eslint-disable react/button-has-type */

import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface ButtonOurProps {
  className?: string;
  to?: LinkProps["to"];
  disabled?: boolean;
}

type AnchorButtonProps = ButtonOurProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonButtonProps = ButtonOurProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonButtonProps | AnchorButtonProps;

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  to,
  ...otherProps
}) => {
  const { href } = otherProps as AnchorButtonProps;
  const { type = "button" } = otherProps as ButtonButtonProps;
  const commonProps = { className };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { disabled } = otherProps;

    if (disabled) {
      event.preventDefault();
    }
  };

  if (to) {
    return (
      <Link
        to={to}
        {...otherProps as AnchorButtonProps}
        {...commonProps}
        onClick={event => handleClick(event)}
      >
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        {...otherProps as AnchorButtonProps}
        {...commonProps}
        onClick={event => handleClick(event)}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} {...otherProps as ButtonButtonProps} {...commonProps}>
      {children}
    </button>
  );
};

export default Button;

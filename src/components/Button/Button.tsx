import React from 'react'
import * as Styled from './Button.styled'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'destructive' | 'success' | 'disabled' | 'warning'
  as?: 'button' | 'a'
  href?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = 'default',
  as = 'button',
  href,
  type,
  className,
  ...props
}: ButtonProps) {
  return (
    <Styled.Button
      as={as}
      href={href}
      onClick={onClick}
      $variant={variant}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </Styled.Button>
  )
}

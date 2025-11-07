import React from 'react'
import { Link } from 'react-router-dom'
import * as Styled from './Button.styled'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'destructive' | 'success' | 'disabled' | 'warning'
  as?: 'button' | 'a' | 'link'
  href?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  external?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'default',
  as = 'button',
  href,
  to,
  type,
  className,
  external = false,
  ...props
}: ButtonProps) {
  // If it's a router link
  if (as === 'link' && to) {
    return (
      <Styled.Button
        as={Link}
        to={to}
        onClick={onClick}
        $variant={variant}
        className={className}
        {...props}
      >
        {children}
      </Styled.Button>
    )
  }

  // If it's an external link or regular anchor
  if (as === 'a' && (href || external)) {
    return (
      <Styled.Button
        as='a'
        href={href}
        onClick={onClick}
        $variant={variant}
        className={className}
        {...props}
      >
        {children}
      </Styled.Button>
    )
  }

  // Default button
  return (
    <Styled.Button
      as='button'
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

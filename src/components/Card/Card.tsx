import React from 'react'
import * as Styled from './Card.styled'
import { Text } from '../Text'

interface CardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  titleSize?: 'small' | 'medium' | 'large'
  clickable?: boolean
  variant?: 'default' | 'elevated' | 'outlined'
  maxWidth?: string
  footer?: React.ReactNode
  actions?: React.ReactNode
  onClick?: () => void
  className?: string
  'aria-label'?: string
  role?: string
}

export default function Card({
  children,
  title,
  subtitle,
  titleSize = 'medium',
  clickable = false,
  variant = 'default',
  maxWidth,
  footer,
  actions,
  onClick,
  className,
  'aria-label': ariaLabel,
  role,
}: CardProps) {
  const Component = clickable ? 'button' : 'div'

  return (
    <Styled.CardContainer
      as={Component}
      clickable={clickable}
      variant={variant}
      maxWidth={maxWidth}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      role={role}
    >
      {(title || subtitle) && (
        <Styled.CardHeader>
          {title && (
            <Text as='h3' bold colour='darkGrey' fontSize={titleSize} mb='tiny'>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text as='p' colour='mediumGrey' fontSize='small'>
              {subtitle}
            </Text>
          )}
        </Styled.CardHeader>
      )}

      <Styled.CardContent>{children}</Styled.CardContent>

      {footer && <Styled.CardFooter>{footer}</Styled.CardFooter>}

      {actions && <Styled.CardActions>{actions}</Styled.CardActions>}
    </Styled.CardContainer>
  )
}

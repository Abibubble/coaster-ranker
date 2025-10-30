import styled from 'styled-components'

interface LinkProps {
  dark?: boolean
}

export const LinkStyled = styled.a<LinkProps>`
  color: ${({ dark, theme }) =>
    dark ? '#000' : theme?.colours?.primary || '#007bff'};
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme?.colours?.focus || '#0066cc'};
    outline-offset: 2px;
  }
`

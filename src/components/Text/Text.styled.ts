import styled, { css } from 'styled-components'
import { colours, fonts, spacing } from '../../theme'

interface StyledTextProps {
  $bold?: boolean
  $center?: boolean
  $colour?: keyof typeof colours
  $fontSize?: keyof typeof fonts
  $italic?: boolean
  $mb?: keyof typeof spacing
  $mt?: keyof typeof spacing
}

export const StyledText = styled.span<StyledTextProps>`
  color: ${({ $colour }) => ($colour ? colours[$colour] : colours.black)};
  font-size: ${({ $fontSize }) => ($fontSize ? fonts[$fontSize] : fonts.body)};
  text-align: ${({ $center }) => ($center ? 'center' : 'left')};
  margin-bottom: ${({ $mb }) => ($mb ? spacing[$mb] : '0')};
  margin-top: ${({ $mt }) => ($mt ? spacing[$mt] : '0')};
  margin-left: 0;
  margin-right: 0;
  overflow-wrap: normal;
  word-wrap: normal;
  hyphens: none;
  white-space: normal;
  max-width: 100%;

  ${({ $bold }) =>
    $bold &&
    css`
      font-weight: 600;
    `}

  ${({ $italic }) =>
    $italic &&
    css`
      font-style: italic;
    `}
`

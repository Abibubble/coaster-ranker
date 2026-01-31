import * as Styled from "./Footer.styled";
import { Link } from "../Link";

/**
 * A footer component that displays navigation links and copyright information.
 *
 * @returns The site footer containing accessibility and privacy policy links with copyright notice
 */
export default function Footer() {
  return (
    <Styled.FooterContainer>
      <Styled.FooterContent>
        <Styled.FooterLinks>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </Styled.FooterLinks>
        <Styled.CopyrightText as="p" colour="white" fontSize="small">
          © Bubble & Squeak
        </Styled.CopyrightText>
      </Styled.FooterContent>
    </Styled.FooterContainer>
  );
}

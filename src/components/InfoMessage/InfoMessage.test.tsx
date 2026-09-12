import {
  render,
  screen,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import { InfoMessage } from "./InfoMessage";
import { Text } from "../Text/Text";
import { colours } from "../../theme";

describe("InfoMessage", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <InfoMessage variant="error">
        <Text>Test message</Text>
      </InfoMessage>
    );
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(
      <InfoMessage variant="success">
        <Text>Success message</Text>
      </InfoMessage>
    );
    await runBasicWCAG22Tests(container);
  });
  it("renders children correctly", () => {
    render(
      <InfoMessage variant="error">
        <Text>Test message</Text>
      </InfoMessage>
    );
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("renders as paragraph element by default", () => {
    render(
      <InfoMessage variant="success">
        <Text>Success message</Text>
      </InfoMessage>
    );
    const element = screen.getByText("Success message").closest("p");
    expect(element).toBeInTheDocument();
  });

  it("applies error variant styling", () => {
    render(
      <InfoMessage variant="error">
        <Text>Error message</Text>
      </InfoMessage>
    );
    const element = screen.getByText("Error message").closest("p");
    expect(element).toHaveStyle(`background-color: ${colours.lightRed}`);
  });

  it("applies success variant styling", () => {
    render(
      <InfoMessage variant="success">
        <Text>Success message</Text>
      </InfoMessage>
    );
    const element = screen.getByText("Success message").closest("p");
    expect(element).toHaveStyle(`background-color: ${colours.lightGreenBg}`);
  });

  it("applies info variant styling", () => {
    render(
      <InfoMessage variant="info">
        <Text>Info message</Text>
      </InfoMessage>
    );
    const element = screen.getByText("Info message").closest("p");
    expect(element).toHaveStyle(`background-color: ${colours.warningBg}`);
  });

  it("applies ARIA attributes correctly", () => {
    render(
      <InfoMessage variant="error" role="alert" aria-live="assertive">
        <Text>Alert message</Text>
      </InfoMessage>
    );
    const element = screen.getByText("Alert message").closest("p");
    expect(element).toHaveAttribute("role", "alert");
    expect(element).toHaveAttribute("aria-live", "assertive");
  });

  it("allows custom background color override", () => {
    render(
      <InfoMessage variant="error" bgColour="blue">
        <Text>Custom color message</Text>
      </InfoMessage>
    );
    const element = screen.getByText("Custom color message").closest("p");
    expect(element).toHaveStyle(`background-color: ${colours.blue}`);
  });

  it("allows custom border color override", () => {
    // jsdom's CSS engine doesn't resolve CSS custom properties for
    // border-color (unlike background-color, it falls back to black), so
    // this asserts against the generated stylesheet text rather than
    // getComputedStyle — see the theme plan for the var()-based colour tokens.
    render(
      <InfoMessage variant="error" borderColour="green">
        <Text>Custom border message</Text>
      </InfoMessage>
    );
    const element = screen.getByText("Custom border message").closest("p");
    const classNames = Array.from(element?.classList ?? []);
    const rules = Array.from(document.styleSheets).flatMap((sheet) =>
      Array.from(sheet.cssRules ?? []),
    );
    const matchingRule = rules.find(
      (cssRule) =>
        classNames.some((name) => cssRule.cssText.includes(`.${name}`)) &&
        cssRule.cssText.includes("border-color"),
    );
    expect(matchingRule?.cssText).toContain(colours.green);
  });
});

import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import UploadJSON from "./UploadJSON";
import { DataProvider } from "../../contexts/DataContext";

const MockedUploadJSON = () => (
  <DataProvider>
    <UploadJSON />
  </DataProvider>
);

describe("UploadJSON", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<MockedUploadJSON />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<MockedUploadJSON />);
    await runBasicWCAG22Tests(container);
  });
});

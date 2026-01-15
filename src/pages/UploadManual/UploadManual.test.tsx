import {
  render,
  testAxeCompliance,
  runBasicWCAG22Tests,
} from "../../utils/testing";
import UploadManual from "./UploadManual";
import { DataProvider } from "../../contexts/DataContext";

const MockedUploadManual = () => (
  <DataProvider>
    <UploadManual />
  </DataProvider>
);

describe("UploadManual", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<MockedUploadManual />);
    await testAxeCompliance(container);
  });

  it("meets WCAG 2.2 Level AA requirements", async () => {
    const { container } = render(<MockedUploadManual />);
    await runBasicWCAG22Tests(container);
  });
});

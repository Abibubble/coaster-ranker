import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { downloadFile } from "./downloadFile.util";

describe("downloadFile", () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;
  const originalClick = HTMLAnchorElement.prototype.click;

  let createObjectURLMock: ReturnType<typeof vi.fn>;
  let revokeObjectURLMock: ReturnType<typeof vi.fn>;
  let clickMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    createObjectURLMock = vi.fn(() => "blob:mock-url");
    revokeObjectURLMock = vi.fn();
    clickMock = vi.fn();

    URL.createObjectURL = createObjectURLMock as unknown as typeof URL.createObjectURL;
    URL.revokeObjectURL = revokeObjectURLMock;
    HTMLAnchorElement.prototype.click = clickMock;
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    HTMLAnchorElement.prototype.click = originalClick;
    vi.restoreAllMocks();
  });

  it("succeeds and triggers a download for valid content/filename/contentType", () => {
    const result = downloadFile({
      content: "name,park\nNemesis,Alton Towers",
      filename: "coasters.csv",
      contentType: "text/csv",
    });

    expect(result).toEqual({ success: true });
    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(clickMock).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:mock-url");
  });

  it("sets the anchor's href and download filename correctly", () => {
    let capturedAnchor: HTMLAnchorElement | null = null;
    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = vi
      .spyOn(document, "createElement")
      .mockImplementation((tagName: string) => {
        const el = originalCreateElement(tagName);
        if (tagName === "a") capturedAnchor = el as HTMLAnchorElement;
        return el;
      });

    downloadFile({
      content: '{"coasters":[]}',
      filename: "coasters.json",
      contentType: "application/json",
    });

    expect(capturedAnchor).not.toBeNull();
    expect(capturedAnchor!.download).toBe("coasters.json");
    expect(capturedAnchor!.href).toBe("blob:mock-url");

    createElementSpy.mockRestore();
  });

  it("builds the Blob with the requested content type plus a utf-8 charset, for both CSV and JSON", () => {
    let capturedBlob: Blob | undefined;
    createObjectURLMock.mockImplementation((blob: Blob) => {
      capturedBlob = blob;
      return "blob:mock-url";
    });

    downloadFile({
      content: "a,b\n1,2",
      filename: "coasters.csv",
      contentType: "text/csv",
    });
    expect(capturedBlob?.type).toBe("text/csv;charset=utf-8");

    downloadFile({
      content: "{}",
      filename: "coasters.json",
      contentType: "application/json",
    });
    expect(capturedBlob?.type).toBe("application/json;charset=utf-8");
  });

  it("prefixes the Blob content with a UTF-8 BOM so Excel opens CSV exports correctly", () => {
    // jsdom's Blob shim doesn't support reading content back out (no
    // .text()/.arrayBuffer()), so instead spy on the Blob constructor itself
    // and capture exactly what downloadFile passed into `new Blob([...])`.
    const OriginalBlob = globalThis.Blob;
    let capturedParts: ConstructorParameters<typeof Blob>[0];
    class SpyBlob extends OriginalBlob {
      constructor(...args: ConstructorParameters<typeof Blob>) {
        super(...args);
        capturedParts = args[0];
      }
    }
    globalThis.Blob = SpyBlob as unknown as typeof Blob;

    try {
      downloadFile({
        content: "name,park\nNemesis,Alton Towers",
        filename: "coasters.csv",
        contentType: "text/csv",
      });

      expect(capturedParts).toEqual([
        "﻿name,park\nNemesis,Alton Towers",
      ]);
    } finally {
      globalThis.Blob = OriginalBlob;
    }
  });

  it("cleans up by appending then removing the anchor, and revoking the object URL", () => {
    const appendSpy = vi.spyOn(document.body, "appendChild");
    const removeSpy = vi.spyOn(document.body, "removeChild");

    downloadFile({
      content: "content",
      filename: "file.csv",
      contentType: "text/csv",
    });

    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:mock-url");

    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it("returns a failure result without touching the DOM/Blob APIs when content is empty", () => {
    const result = downloadFile({
      content: "",
      filename: "coasters.csv",
      contentType: "text/csv",
    });

    expect(result).toEqual({
      success: false,
      error: "Content and filename are required",
    });
    expect(createObjectURLMock).not.toHaveBeenCalled();
  });

  it("returns a failure result without touching the DOM/Blob APIs when filename is empty", () => {
    const result = downloadFile({
      content: "some content",
      filename: "",
      contentType: "text/csv",
    });

    expect(result).toEqual({
      success: false,
      error: "Content and filename are required",
    });
    expect(createObjectURLMock).not.toHaveBeenCalled();
  });

  it("catches a thrown error from the browser APIs and returns it as a failure result", () => {
    createObjectURLMock.mockImplementation(() => {
      throw new Error("createObjectURL exploded");
    });

    const result = downloadFile({
      content: "content",
      filename: "file.csv",
      contentType: "text/csv",
    });

    expect(result).toEqual({
      success: false,
      error: "createObjectURL exploded",
    });
  });

  it("falls back to a generic error message when a non-Error value is thrown", () => {
    createObjectURLMock.mockImplementation(() => {
      throw "not an Error instance";
    });

    const result = downloadFile({
      content: "content",
      filename: "file.csv",
      contentType: "text/csv",
    });

    expect(result).toEqual({
      success: false,
      error: "Unknown download error",
    });
  });

  it("works the same way for a dark-ride export (the function has no ride-type-specific behavior)", () => {
    const result = downloadFile({
      content: "name,park\nHaunted Mansion,Magic Kingdom",
      filename: "dark-rides.csv",
      contentType: "text/csv",
    });

    expect(result).toEqual({ success: true });
  });
});

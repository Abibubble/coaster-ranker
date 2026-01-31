/**
 * Utility functions for triggering file downloads in the browser.
 * Handles blob creation, URL generation, and cleanup for downloading generated data files.
 */

export interface DownloadFileParams {
  content: string;
  filename: string;
  contentType: string;
}

export interface DownloadFileResult {
  success: boolean;
  error?: string;
}

export function downloadFile(params: DownloadFileParams): DownloadFileResult {
  const { content, filename, contentType } = params;

  try {
    if (!content || !filename) {
      return {
        success: false,
        error: "Content and filename are required",
      };
    }

    const blob = new Blob(["\ufeff" + content], {
      type: contentType + ";charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown download error",
    };
  }
}

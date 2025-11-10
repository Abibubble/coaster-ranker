export interface DownloadFileParams {
  content: string
  filename: string
  contentType: string
}

export interface DownloadFileResult {
  success: boolean
  error?: string
}

/**
 * Download content as a file in the browser
 * Creates a blob, generates a download link, and triggers the download
 */
export function downloadFile(params: DownloadFileParams): DownloadFileResult {
  const { content, filename, contentType } = params

  try {
    // Validate inputs
    if (!content || !filename) {
      return {
        success: false,
        error: 'Content and filename are required',
      }
    }

    // Create blob and download link with UTF-8 encoding
    const blob = new Blob(['\ufeff' + content], {
      type: contentType + ';charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = filename

    // Temporarily add to DOM, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up the object URL
    URL.revokeObjectURL(url)

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown download error',
    }
  }
}

/**
 * Generate a timestamped filename for exports
 */
export function generateExportFilename(
  baseName: string,
  format: string,
  includeTimestamp = true
): string {
  if (includeTimestamp) {
    const timestamp = new Date().toISOString().slice(0, 10)
    return `${baseName}-${timestamp}.${format}`
  }
  return `${baseName}.${format}`
}

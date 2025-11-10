import { vi, describe, it, expect, beforeEach } from 'vitest'
import { downloadFile } from './downloadFile'

describe('downloadFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create blob with UTF-8 BOM and charset for CSV files', () => {
    const content = 'name,park\nCafé Racer,Parc Astérix'
    const filename = 'test.csv'
    const contentType = 'text/csv'

    // Mock Blob constructor
    const mockBlob = vi.fn()
    global.Blob = mockBlob as any

    // Mock DOM and URL methods
    const mockLink = { href: '', download: '', click: vi.fn() }
    const mockCreateElement = vi.fn(() => mockLink)
    const mockAppendChild = vi.fn()
    const mockRemoveChild = vi.fn()
    const mockCreateObjectURL = vi.fn(() => 'blob:mock-url')
    const mockRevokeObjectURL = vi.fn()

    Object.defineProperty(document, 'createElement', {
      value: mockCreateElement,
      configurable: true,
    })
    Object.defineProperty(document, 'body', {
      value: { appendChild: mockAppendChild, removeChild: mockRemoveChild },
      configurable: true,
    })
    global.URL = {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL,
    } as any

    downloadFile({ content, filename, contentType })

    // Check that Blob was created with BOM and UTF-8 charset
    expect(mockBlob).toHaveBeenCalledWith(['\ufeff' + content], {
      type: 'text/csv;charset=utf-8',
    })
  })

  it('should create blob with UTF-8 BOM and charset for JSON files', () => {
    const content = '{"name": "Café Racer", "park": "Parc Astérix"}'
    const filename = 'test.json'
    const contentType = 'application/json'

    // Mock Blob constructor
    const mockBlob = vi.fn()
    global.Blob = mockBlob as any

    // Mock DOM and URL methods
    const mockLink = { href: '', download: '', click: vi.fn() }
    const mockCreateElement = vi.fn(() => mockLink)
    const mockAppendChild = vi.fn()
    const mockRemoveChild = vi.fn()
    const mockCreateObjectURL = vi.fn(() => 'blob:mock-url')
    const mockRevokeObjectURL = vi.fn()

    Object.defineProperty(document, 'createElement', {
      value: mockCreateElement,
      configurable: true,
    })
    Object.defineProperty(document, 'body', {
      value: { appendChild: mockAppendChild, removeChild: mockRemoveChild },
      configurable: true,
    })
    global.URL = {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL,
    } as any

    downloadFile({ content, filename, contentType })

    // Check that Blob was created with BOM and UTF-8 charset
    expect(mockBlob).toHaveBeenCalledWith(['\ufeff' + content], {
      type: 'application/json;charset=utf-8',
    })
  })

  it('should return error when content is empty', () => {
    const result = downloadFile({
      content: '',
      filename: 'test.txt',
      contentType: 'text/plain',
    })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Content and filename are required')
  })

  it('should return error when filename is empty', () => {
    const result = downloadFile({
      content: 'test content',
      filename: '',
      contentType: 'text/plain',
    })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Content and filename are required')
  })
})

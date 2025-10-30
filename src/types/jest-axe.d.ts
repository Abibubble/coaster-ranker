declare module 'jest-axe' {
  export function axe(html: Element | HTMLDocument): Promise<any>
  export function toHaveNoViolations(results: any): {
    message(): string
    pass: boolean
  }
  export function configureAxe(options?: any): typeof axe
}

declare namespace jest {
  interface Matchers<R> {
    toHaveNoViolations(): R
  }
}

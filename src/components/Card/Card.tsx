import { ReactNode } from 'react'

export type CardProps = {
  children: ReactNode
}

export default function Card({ children }: CardProps) {
  return <div>{children}</div>
}

import React from 'react'
import * as Styled from './SkipLink.styled'

export default function SkipLink() {
  const handleSkipLinkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView()
    }
  }

  return (
    <Styled.SkipLink href='#main-content' onClick={handleSkipLinkClick}>
      Skip to main content
    </Styled.SkipLink>
  )
}

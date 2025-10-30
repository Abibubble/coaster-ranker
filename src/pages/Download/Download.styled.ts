import styled from 'styled-components'

export const CenteredCount = styled.p`
  text-align: center;
`

export const DownloadContent = styled.div`
  padding: 1.5rem;
`

export const Section = styled.div`
  margin-bottom: 2rem;

  h2,
  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    margin-bottom: 0.5rem;
    color: #666;
  }
`

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    border-color: #007bff;
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`

export const FileIcon = styled.span`
  font-size: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;
`

export const ButtonContent = styled.div`
  text-align: left;
  flex: 1;
`

export const ButtonTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
`

export const ButtonDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`

export const StatusMessage = styled.div<{ $isSuccess: boolean }>`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  text-align: center;

  background: ${props => (props.$isSuccess ? '#d4edda' : '#f8d7da')};
  color: ${props => (props.$isSuccess ? '#155724' : '#721c24')};
  border: 1px solid ${props => (props.$isSuccess ? '#c3e6cb' : '#f5c6cb')};
`

export const InfoSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  text-align: center;

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;

  h2 {
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    margin-bottom: 2rem;
    color: #666;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
`

export const UploadLink = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`

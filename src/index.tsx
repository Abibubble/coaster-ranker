import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Accessibility,
  Download,
  Home,
  PrivacyPolicy,
  Rank,
  Upload,
  UploadCSV,
  UploadJSON,
  UploadManual,
  ViewCoasters,
} from './pages'
import { Footer, Header, SkipLink } from './components'
import { DataProvider } from './contexts/DataContext'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <DataProvider>
      <Router basename='/coaster-ranker'>
        <SkipLink />
        <Header />
        <main id='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/accessibility' element={<Accessibility />} />
            <Route path='/download' element={<Download />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/rank' element={<Rank />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/upload-csv' element={<UploadCSV />} />
            <Route path='/upload-json' element={<UploadJSON />} />
            <Route path='/upload-manual' element={<UploadManual />} />
            <Route path='/view-coasters' element={<ViewCoasters />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </DataProvider>
  </React.StrictMode>
)

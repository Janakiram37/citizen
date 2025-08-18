import React from 'react'
import NewsMarquee from './components/NewsMarquee'
import SchemeSlider from './components/SchemeSlider'
import LatestNews from './components/LatestNews'

const page = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <NewsMarquee/>
      <SchemeSlider/>
      <LatestNews/>
    </div>
  )
}

export default page

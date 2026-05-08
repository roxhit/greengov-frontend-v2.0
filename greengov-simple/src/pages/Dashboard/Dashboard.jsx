import React from 'react'
import FeaturesSection from '../../components/home/FeaturesSection'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/home/Footer'

const Dashboard = () => {
  return (
    <>
    <Navbar />
     <div>
        <FeaturesSection />
     </div>
     <Footer/>
    </>
  )
}

export default Dashboard
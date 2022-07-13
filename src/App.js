import React from 'react'
import Nav from './component/Nav';
import Footer from './component/Footer';
import Homepage from './pages/Homepage';

const App = () => {
  return (
    <div>
      <Nav/>  
      <Homepage/>
      <Footer/>
    </div>
  )
}

export default App
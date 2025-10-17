import Navbar from './components/navbar';
import Hero from './components/hero';
import ProductViewer from './components/ProductViewer';
import Showcase from './components/three/showcase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Performance from './components/Performance';
import Features from './components/Features';
import Highlight from './components/Highlight';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlight />
      <Footer />
    </div>
  )
}

export default App
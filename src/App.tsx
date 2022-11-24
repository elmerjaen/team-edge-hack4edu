import { motion } from 'framer-motion';
import Navbar from './features/LandingPage/components/Navbar';
import LandingPage from './features/LandingPage/components/LandingPage';

const App = () => (
  <motion.main
    className="relative h-full bg-gray-400"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Navbar />
    <LandingPage />
  </motion.main>
);

export default App;

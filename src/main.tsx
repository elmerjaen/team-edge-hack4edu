import { AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import TakePicture from './features/LandingPage/components/TakePicture';
import './index.css';

ReactDOM.render(
  <Router>
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="object-detection" element={<TakePicture />} />
      </Routes>
    </AnimatePresence>
  </Router>,
  document.getElementById('root')
);

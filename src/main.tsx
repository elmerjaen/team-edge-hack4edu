import { AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ObjectDetectionTest from './features/ObjectDetection/components/ObjectDetectionTest';
import ObjectDetection from './features/ObjectDetection/components/ObjectDetection';
import WebCamLearn from './features/ObjectDetection/components/WebCamLearn';
import './index.css';

ReactDOM.render(
  <Router>
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="object-detection" element={<ObjectDetection />} />
        <Route path="aprender-vocales" element={<ObjectDetectionTest />} />
        <Route path="object-detection" element={<WebCamLearn />} />
      </Routes>
    </AnimatePresence>
  </Router>,
  document.getElementById('root')
);

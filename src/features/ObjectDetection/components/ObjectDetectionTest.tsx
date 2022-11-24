/* eslint-disable jsx-a11y/click-events-have-key-events */
// import * as tf from '@tensorflow/tfjs';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import WebCamLearn from './WebCamLearn';

// const model = await tf.loadGraphModel(
//   'https://2021tensorflowjsrealtimemodel2021.s3.us-south.cloud-object-storage.appdomain.cloud/model.json'
// );

const SignDetection = () => {
  const [webCamLoaded, setWebCamLoaded] = useState(false);
  const webCamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoWidth, setVideoWidth] = useState(640);
  const [videoHeight, setVideoHeight] = useState(480);

  const navigate = useNavigate();
  const [indications, setIndications] = useState(false);
  const [showIndicationsButton, setShowIndicationsButton] = useState(true);
  const [popupOpened, setPopupOpened] = useState(false);
  const [letter, setLetter] = useState(0);
  const [letter2, setLetter2] = useState(0);
  const [labelButton, setLabelButton] = useState(0);
  const labelsButtonPopup = ['Continuar', 'Finalizar'];
  const listOfLetters = ['vocalA', 'vocalE', 'vocalI', 'vocalO', 'vocalU'];

  const rightAnswer = new Audio('src/audios/rightanswer.mp3');
  const start = () => {
    rightAnswer.play();
  };

  function showPopup() {
    setTimeout(() => {
      start();
    }, 2000);
    setTimeout(() => {
      setIndications(false);
      setPopupOpened(true);
      setLetter2(letter);
    }, 3000);
  }

  function handleClick() {
    setPopupOpened(!popupOpened);
    // setShowIndicationsButton(!showIndicationsButton);
    setLetter(letter + 1);
    if (letter === 3) {
      setLabelButton(1);
    }
    if (letter === 4) {
      navigate('/');
    }
  }

  const currentLetter = listOfLetters[letter] || listOfLetters[0];
  const labelButtonPopup = labelsButtonPopup[labelButton];
  const labelLetter = `${currentLetter
    ?.slice(0, 1)
    .toUpperCase()}${currentLetter?.slice(1, 5)} ${currentLetter?.slice(-1)}`;
  const popupLabelLetter = `${listOfLetters[letter2]?.slice(
    0,
    5
  )} ${listOfLetters[letter2]?.slice(-1)}`;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-300 h-screen"
    >
      <motion.p
        initial={{ opacity: 0, bottom: 10 }}
        animate={
          indications
            ? { opacity: 1, right: '1rem' }
            : { opacity: 0, right: '0rem' }
        }
        transition={{ duration: 1, ease: 'anticipate' }}
        className="pointer-events-none absolute w-96 z-10 bg-black bg-opacity-80 p-3 rounded-xl left-44 text-justify text-white"
      >
        Apunta a la cámara e intenta recrear la seña de la izquierda. Apóyate
        con la demostración de la derecha.
      </motion.p>
      <div className="flex space-x-6 px-8 py-6 items-center">
        <div
          className="px-20 py-6 bg-blue-400 border-4 border-black rounded-full text-center"
          onClick={() => {
            showPopup();
          }}
          // onKeyPress={}
          role="button"
          tabIndex={0}
        >
          <img
            className="w-40"
            src={`src/images/${currentLetter}.png`}
            alt=""
          />
          {labelLetter}
        </div>
        <div>
          <WebCamLearn
            onWebCamLoad={() => {
              setWebCamLoaded(true);
            }}
            canvasRef={canvasRef}
            webCamRef={webCamRef}
            height={videoHeight}
            width={videoWidth}
          />
        </div>
        <div className="relative rounded-2xl border-4 border-black overflow-hidden">
          <video
            loop
            autoPlay
            muted
            className="w-96"
            src={`src/videos/${currentLetter}.mp4`}
          >
            <track kind="captions" />
          </video>
        </div>
      </div>

      {showIndicationsButton && (
        <button
          type="button"
          onClick={() => {
            setIndications(!indications);
            setPopupOpened(false);
          }}
          className="absolute left-5 bottom-3 rounded-lg p-4 bg-blue-600 text-white font-bold transition-colors hover:bg-blue-900 hover:text-white"
        >
          Indicaciones
        </button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={popupOpened ? { opacity: 1, y: -5 } : undefined}
        transition={{ duration: 0.25, ease: 'anticipate' }}
        className="flex relative mx-48 my-4 h-32 bg-blue-300 rounded-full items-center z-10"
      >
        <div className="flex space-x-6 mx-36 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
            className="w-24"
            alt=""
          />
          <h1 className="text-2xl font-medium">
            {`¡Correcto! Esa es la ${popupLabelLetter}.`}
          </h1>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="absolute right-40 bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-full"
        >
          {labelButtonPopup}
        </button>
      </motion.div>
    </motion.main>
  );
};

export default SignDetection;

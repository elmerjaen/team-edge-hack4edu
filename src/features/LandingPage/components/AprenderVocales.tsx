/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SignDetection from '../../SignDetection/components/ObjectDetection';

const AprenderVocales = () => {
  const navigate = useNavigate();
  const [popupOpened, setPopupOpened] = useState(false);
  const [letter, setLetter] = useState(0);
  const [buttonPopupLabel, setButtonPopupLabel] = useState(0);
  const listLabelPopup = ['Continuar', 'Finalizar'];
  const listOfLetters = ['vocalA', 'vocalE', 'vocalI', 'vocalO', 'vocalU'];

  function handleClick() {
    setLetter(letter + 1);
    // setPopupOpened(!popupOpened);
    if (letter === 3) {
      setButtonPopupLabel(1);
    }
    if (letter === 4) {
      navigate('/');
    }
  }

  const currentLetter = listOfLetters[letter] || listOfLetters[0];
  const labelPopup = listLabelPopup[buttonPopupLabel];
  const labelLetter = `${currentLetter
    ?.slice(0, 1)
    .toUpperCase()}${currentLetter?.slice(1, 5)} ${currentLetter?.slice(-1)}`;

  // const rightAnswer = new Audio('src/audios/rightanswer.mp3');
  // const start = () => {
  //   rightAnswer.play();
  // };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex space-x-6 px-8 py-10 items-center">
        <button
          type="button"
          onClick={() => {
            setPopupOpened(!popupOpened);
            // start();
          }}
        >
          Click
        </button>

        <div className="flex-none px-20 py-4 bg-blue-400 rounded-full text-center">
          <div className="w-40">
            <img src={`src/images/${currentLetter}.png`} alt="" />
          </div>
          {labelLetter}
        </div>

        <SignDetection />

        <div className="flex-initial px-4 py-2 bg-blue-400 rounded-lg">
          <video
            loop
            autoPlay
            muted
            style={{ objectFit: 'cover' }}
            className="w-96 rounded-lg"
            src="src/videos/sign-language.mp4"
          >
            <track kind="captions" />
          </video>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={popupOpened ? { opacity: 1, y: -5 } : undefined}
        transition={{ duration: 0.25, ease: 'anticipate' }}
        className="flex relative mx-16 my-4 h-40 bg-blue-300 rounded-full items-center"
      >
        <div className="flex space-x-6 mx-40 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
            className="w-24"
            alt=""
          />
          <h1 className="text-2xl font-medium">
            {`¡Correcto! Esa es la ${labelLetter}.`}
          </h1>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="bg-blue-500 mx-36 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-full"
        >
          {labelPopup}
        </button>
      </motion.div>
    </motion.main>
  );
};

export default AprenderVocales;

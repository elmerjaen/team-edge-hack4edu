/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Particles from 'react-tsparticles';
// import particlesConfig from './particlesConfig.json';

const boxVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  },
  hidden: { opacity: 0, x: -100 }
};

const Box = ({ num }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  return (
    <motion.div
      className="absolute text-center my-4 mx-32"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <h1 className="text-black py-4 text-2xl font-bold">
        Equipo de Investigación
      </h1>
      <div className="relative flex space-x-6 mx-10 my-4">
        <div className="relative flex space-x-4 text-center items-center">
          <img
            src="src/images/profile-elmer.png"
            className="w-24 h-24"
            alt=""
          />
          <div className="text-black text-left">
            <h1 className="font-bold">Elmer Jaén</h1>
            <p className="text-sm">
              Estudiante de Ing. Sistemas y Computación.
            </p>
          </div>
        </div>
        <div className="relative flex space-x-4 text-center items-center">
          <img
            src="src\images\profile-gerardo.png"
            className="w-24 h-24"
            alt=""
          />
          <div className="text-black text-left">
            <h1 className="font-bold">Gerardo Moreno</h1>
            <p className="text-sm">
              Estudiante de Ing. Sistemas y Computación.
            </p>
          </div>
        </div>
        <div className="relative flex space-x-4 text-center items-center">
          <img
            src="src/images/profile-castillo.png"
            className="w-24 h-24"
            alt=""
          />
          <div className="text-black text-left">
            <h1 className="font-bold">Encarnación Castillo</h1>
            <p className="text-sm">
              Estudiante de Ing. Sistemas y Computación.
            </p>
          </div>
        </div>
        <div className="relative flex space-x-4 text-center items-center">
          <img
            src="src/images/profile-dante.png"
            className="w-24 h-24"
            alt=""
          />
          <div className="text-black text-left">
            <h1 className="font-bold">Dante Della Togna</h1>
            <p className="text-sm">
              Estudiante de Ing. Sistemas y Computación.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LandingPage = () => (
  <>
    {/* <Particles params={particlesConfig} /> */}
    <div className="relative mt-20 text-center text-black pb-40">
      <h1 className="text-9xl font-medium tracking-widest">TUTOR</h1>
      <p className="text-2xl tracking-normal">
        Tutor inteligente para la enseñanza de la riqueza cultural
      </p>
      <p className="text-2xl tracking-normal">en Panamá y Latinoamerica</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative border-4 border-black px-8 py-3 text-black transition-colors hover:bg-black hover:text-white block mx-auto mt-10"
        type="button"
      >
        <Link to="/object-detection">EMPEZAR</Link>
      </motion.button>
      <Box num={1} />
    </div>
  </>
);

export default LandingPage;

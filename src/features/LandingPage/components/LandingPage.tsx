/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      className="absolute text-center my-2 mx-32"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <h1 className="text-black py-2 text-2xl font-bold">
        Equipo de Investigación
      </h1>
      <div className="relative flex space-x-6 mx-10 my-4">
        <div className="relative flex space-x-4 text-center items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/team-edge.appspot.com/o/projectFiles%2Fprofile-pic.png?alt=media&token=c06e53c4-056a-45b6-a30e-cd0ee649569a"
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
            src="https://firebasestorage.googleapis.com/v0/b/team-edge.appspot.com/o/projectFiles%2Fprofile-gerardo.png?alt=media&token=dc1445b2-46b5-4909-a712-e6cbb582c08b"
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
            src="https://firebasestorage.googleapis.com/v0/b/team-edge.appspot.com/o/projectFiles%2Fprofile-castillo.png?alt=media&token=1dd306ef-7ee4-4843-9cd5-a2969d352587"
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
            src="https://firebasestorage.googleapis.com/v0/b/team-edge.appspot.com/o/projectFiles%2Fprofile-dante.png?alt=media&token=eafc6179-7a11-46bd-b79f-f9ce517b3d16"
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
  <div className="relative mt-20 text-center text-black pb-40">
    <div className="flex justify-center">
      <img
        src="src/images/eonfolk.png"
        className="flex justify-center h-24"
        alt=""
      />
    </div>
    <p className="text-2xl tracking-normal">
      Tutor inteligente para la enseñanza de la riqueza cultural
    </p>
    <p className="text-2xl tracking-normal">en Panamá y Latinoamerica</p>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative border-4 border-black px-8 py-3 text-black transition-colors hover:text-white block mx-auto mt-10"
      type="button"
    >
      <Link to="/object-detection">EMPEZAR</Link>
    </motion.button>
    <Box num={1} />
  </div>
);

export default LandingPage;

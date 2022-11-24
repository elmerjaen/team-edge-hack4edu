/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import SidebarData from './SidebarData';
import './Navbar.css';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [infoOpened, setInfoOpened] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const color = useMemo(() => ({ color: '#fff' }), []);

  return (
    <header className="sticky left-0 right-0 z-10 flex justify-between py-2 px-10 bg-dark-blue">
      <IconContext.Provider value={color}>
        {/* This is the navbar div */}
        <div className="flex h-20 items-center">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
      <div className="relative flex items-center gap-10">
        <img
          className="relative left-4"
          src="src/images/utp-logo.png"
          width="80px"
          alt=""
        />
        <button
          type="button"
          onClick={() => {
            setInfoOpened(!infoOpened);
          }}
          className="relative right-1.5 border-2 p-4 text-white transition-colors hover:bg-blue-400 hover:text-black hover:border-white"
        >
          Nuestra Misión
        </button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={infoOpened ? { opacity: 1, top: '6rem' } : undefined}
          transition={{ duration: 1, ease: 'anticipate' }}
          className="pointer-events-none absolute w-80 bg-black bg-opacity-30 p-5 rounded-xl shadow-xl right-0 text-justify text-white"
        >
          EONFOLK tiene la misión de promover la enseñanza de la riqueza
          cultural a través de un sistema inteligente que permita a los usuarios
          aprender de manera interactiva los elementos representativos de la
          cultura panameña y de centroamérica.
        </motion.p>
      </div>
    </header>
  );
};

export default Navbar;

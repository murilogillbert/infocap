/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';

import styles from './App.module.css';
import Footer from '../../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  const isLoggedIn = false; // Substitua com a lógica de verificação de login

  return (
    <div className={styles.app}>
      <Navbar isLoggedIn={isLoggedIn} />
      <main>
      <Outlet/>
      </main>
      
      <Footer/>
    </div>
  );
};

export default App;

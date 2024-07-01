import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem('user'));
    if (usersData && Array.isArray(usersData.user)) {
      usersData.user.forEach((user) => {
        if (user.autenticado === true) {
          setIsLoggedIn(true);
        }
      });
      console.log(usersData.user[0]); // Exibindo o primeiro usuário para depuração
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    const usersData = JSON.parse(localStorage.getItem('user'));
    const updatedUsers = usersData.user.map((user) => {
      return { ...user, autenticado: false };
    });

    localStorage.setItem('user', JSON.stringify({ user: updatedUsers }));

    // Lógica de logout aqui
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };
  //Verifica a cada 5 segundos se a largura da tela está abaixo ou acima de 768px
  //Mudando dinamicamente o conteúdo do menu  
  useEffect(() => {
    const interval = setInterval(() => {
      if (menuOpen && window.innerWidth > 768) {
        setMenuOpen(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [menuOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/"><img src="src/assets/logo.png" alt="Logo" /></Link>
      </div>
      <div className={styles.navRight}>
        <button className={styles.menuToggle} onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={`${styles.content} ${menuOpen ? styles.menuOpen : ''}`}>
          <ul className={styles.menu}>
            <li><Link to="/about">Sobre</Link></li>
            <li><Link to="/cursos">Cursos</Link></li>
            <li><Link to="/contact">Contato</Link></li>
            {isLoggedIn && menuOpen && (
              <>
                <li><Link to="/certificados">Certificados</Link></li>
                <li><Link to="/configuracao">Configuração</Link></li>
                <li><Link to='/meusCursos'>Meus Cursos</Link></li>
                <li><Link to='/' onClick={handleLogout}>Logout</Link></li>
              </>
            )}
          </ul>
          <div className={styles.auth}>
            {isLoggedIn ? (
              <div className={styles.profileContainer}>
                <div className={styles.profileIcon} onClick={toggleDropdown}>
                  <img src='src/assets/profile.png' alt='profile'></img>
                </div>
                {dropdownOpen && !menuOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link to="/certificados">Certificados</Link>
                    <Link to="/configuracao">Configuração</Link>
                    <Link to='/meusCursos'>Meus Cursos</Link>
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className={styles.loginButton}>Login</Link>
                <Link to="/cadastro" className={styles.signupButton}>Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

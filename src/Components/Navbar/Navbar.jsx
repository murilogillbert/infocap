import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Importe o contexto de autenticação
import styles from './Navbar.module.css';


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Use a informação de autenticação e a função de logout
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Chame a função de logout do contexto
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
            {isAuthenticated && menuOpen && (
              <>
                <li><Link to="/certificados">Certificados</Link></li>
                <li><Link to="/configuracao">Configuração</Link></li>
                <li><Link to='/meusCursos'>Meus Cursos</Link></li>
                <li><Link to='/' onClick={handleLogout}>Logout</Link></li>
              </>
            )}
          </ul>
          <div className={styles.auth}>
            {isAuthenticated ? (
              <div className={styles.profileContainer}>
                <button className={styles.profileIcon} onClick={toggleDropdown}>Meu Perfil</button>
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

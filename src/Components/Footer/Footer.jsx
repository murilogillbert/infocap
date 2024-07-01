import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-media">
        <a href="https://facebook.com/infocorp" target="_blank" rel="noopener noreferrer"><img src='src/assets/facebook.png  '></img></a>
        <a href="https://www.instagram.com/infocorpjr/" target="_blank" rel="noopener noreferrer"><img src='src/assets/instagram.png'></img></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src='src/assets/linkedin.png'></img></a>
      </div>
      <div className="caption">
        <span>© Infocorp 2024</span>
      </div>
    </footer>
  );
};

export default Footer;

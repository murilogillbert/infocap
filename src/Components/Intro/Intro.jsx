import styles from './Intro.module.css';
import courseImage from '../../assets/course-image.jpg'; // Substitua com o caminho da sua imagem

const Intro = () => {
  return (
    <section className={styles.intro}>
      <div className={styles.text}>
        <h1>Descubra o Poder do <span className={styles.enfase}>Conhecimento</span> na InfoCAP
</h1>
        <p>Na InfoCAP, estamos comprometidos em proporcionar uma experiência única de aprendizado, capacitando nossos membros e a comunidade do Instituto de Computação com os mais recentes conhecimentos e habilidades no campo da tecnologia.</p>
      </div>
      <div className={styles.image}>
        <img src={courseImage} alt="Curso" />
      </div>
    </section>
  );
};

export default Intro;

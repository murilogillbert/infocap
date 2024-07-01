import './Home.css';
import Intro from '../../Components/Intro/Intro';
import CoursesSlider from '../../Components/CoursesSlider/CousersSlider';
import Vantagens from '../../Components/Vantagens/Vantagens';

const Home = () => {
  return (
    <div className="home">
      <Intro/>
      <Vantagens/>
      <CoursesSlider />
    </div>
  );
};

export default Home;

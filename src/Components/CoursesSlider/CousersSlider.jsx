import './CoursesSlider.css';

const courses = [
    { image: "src/components/CoursesSlider/CoursesImgs/cmaismais.png", title: "C++", price: "$50" },
    { image: "src/components/CoursesSlider/CoursesImgs/csharp.png", title: "C#", price: "$40" },
    { image: "src/components/CoursesSlider/CoursesImgs/html.png", title: "HTML", price: "$30" },
    { image: "src/components/CoursesSlider/CoursesImgs/c.png", title: "C", price: "$20" },
    { image: "src/components/CoursesSlider/CoursesImgs/python.png", title: "Python", price: "$60" },
    { image: "src/components/CoursesSlider/CoursesImgs/java.webp", title: "Java", price: "$70" },
    { image: "src/components/CoursesSlider/CoursesImgs/r.webp", title: "R", price: "$80" },
    { image: "src/components/CoursesSlider/CoursesImgs/php.png", title: "PHP", price: "$90" },
];

const CoursesSlider = () => {
  return (
    <section className="slider">
      <h2>Nossos Cursos</h2>
      <div className="courses">
        {courses.map((course, index) => (
          <div key={index} className="course">
            <img src={course.image} alt={course.title} />
            <p>{course.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesSlider;

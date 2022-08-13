import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  console.log(course);
  return (
    <>
      <div>
        <Header title={course.name} />
      </div>
      <div>
        <Content content={course.parts} />
      </div>
    </>
  );
}; 

export default Course;

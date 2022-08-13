const Part = ({ part }) => {
  console.log(part);
  return (
    <div>
      <p>
        {part.name}: {part.exercises}
      </p>
    </div>
  );
};

export default Part;

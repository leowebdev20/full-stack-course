import React, { useState } from "react";
import Part from "./Part";

const Content = ({ content }) => {
  let initialValue = 0;
  let sum = content.reduce(function (accumulator, curValue) {
    return accumulator + curValue.exercises;
  }, initialValue);

  return (
    <div>
      {content.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
      <p>Total of {sum} exercises</p>
    </div>
  );
};

export default Content;

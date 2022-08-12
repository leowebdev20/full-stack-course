import { useState } from "react";

const StatisticLine = (props) => (
  <div>
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    return (
      <div>
        <StatisticLine value={good} text="Good" />
        <StatisticLine value={neutral} text="Neutral" />
        <StatisticLine value={bad} text="Bad" />
        <StatisticLine value={good + neutral + bad} text="All" />
        <StatisticLine value={good + -bad} text="Average" />
        <StatisticLine
          value={(100 * good) / (good + neutral + bad)}
          text="Positive %"
        />
      </div>
    );
  } else {
    return <div>No Feedback given</div>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(0);
  const [array, setArray] = useState(new Uint8Array(7));
  const [best, setBest] = useState(null);

  const voteAnecdote = () => {
    // increment the value in position 2 by one
    const copy = [...array];

    console.log(copy);

    copy[selected] += 1;
    setVote(copy[selected]);
    console.log(vote);
    console.log(copy[selected]);
    setArray(copy);

    const max = Math.max(...copy);

    const index = copy.indexOf(max);
    setBest(index);
    console.log(anecdotes[best]);
  };

  return (
    <>
      <h1>Best Anecdote</h1>
      {best && <div>{anecdotes[best]}</div>}
      <h2>Choose one</h2>
      <div>{anecdotes[selected]}</div>
      <Button
        handleClick={() => setSelected(Math.floor(Math.random() * 7))}
        text="Next Anectode"
      />
      <Button handleClick={voteAnecdote} text="Vote" />
      has {vote} votes.
      <h2>Give Feedback</h2>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <h2>Statistics</h2>
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    </>
  );
};

export default App;

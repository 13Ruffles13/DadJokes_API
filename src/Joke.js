import React from "react";
import "./Joke.css";

/**
 * A single joke, along with vote up/down buttons.
 * @param {Object} props - The props containing id, vote, votes, and text for the joke.
 */
const Joke = (props) => {
  const { id, vote, votes, text } = props;

  const handleVote = (voteValue) => {
    vote(id, voteValue);
  };

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={() => handleVote(1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={() => handleVote(-1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
};

export default Joke;

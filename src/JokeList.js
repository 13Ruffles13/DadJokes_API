import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */
const JokeList = ({ numJokesToGet = 5 }) => {
  // State to store jokes and loading status
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve jokes from API
  const getJokes = useCallback(async () => { // MEMORIZED CALLS
    try {
      // Load jokes one at a time, adding not-yet-seen jokes
      let newJokes = [];
      let seenJokes = new Set();

      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          newJokes.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }

      setJokes(newJokes);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [numJokesToGet]);

  useEffect(() => { // SIDE EFFECTS
    getJokes();
  }, [getJokes]);

  // Empty joke list, set to loading state, and then call getJokes
  const generateNewJokes = () => {
    setIsLoading(true);
    getJokes();
  };

  // Change vote for this id by delta (+1 or -1)
  const vote = (id, delta) => {
    setJokes((prevJokes) =>
      prevJokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  };

  // Sort jokes by votes in descending order
  const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      {isLoading ? (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      ) : (
        sortedJokes.map((j) => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={vote}
          />
        ))
      )}
    </div>
  );
};

export default JokeList;

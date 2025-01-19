import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/stories?page=${page}&limit=5`
      );
      setStories(response.data.data);
      setError("");
    } catch (err) {
      setError("Error fetching stories");
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredStories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/filter?genre=${genre}&page=${page}&limit=5`
      );
      setStories(response.data.data);
      setError("");
    } catch (err) {
      setError("Error fetching filtered stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (genre) {
      fetchFilteredStories();
    } else {
      fetchStories();
    }
  }, [page, genre]);

  return (
    <div>
      <h1>Stories</h1>
      <div>
        <label>Filter by Genre: </label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <h2>{story.story}</h2>
            <p>Genre: {story.genre}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default App;

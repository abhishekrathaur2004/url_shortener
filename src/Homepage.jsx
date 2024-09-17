import { data } from "autoprefixer";
import React, { useState } from "react";

const Homepage = () => {
  const [url, setUrl] = useState("");
  const [shortendUrl, setShortendUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/shorten", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        originalUrl: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const {shortUrl} = data;
        setShortendUrl(shortUrl);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL here"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          required
        />
        <button
          type="submit"
          className="w-full mb-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Shorten URL
        </button>
        <input
          type="url"
          value={shortendUrl}
          disabled
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL here"
          className="w-full  p-3 border border-gray-300 rounded-lg mb-4"
          required
        />
      </form>
    </div>
  );
};

export default Homepage;

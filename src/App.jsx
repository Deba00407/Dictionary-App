import { useState, useEffect } from 'react';

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (word !== "") {
        const fetchedData = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (fetchedData.ok) {
          const jsonData = await fetchedData.json();
          setData(jsonData);
        }
      }
    };

    fetchData();
  }, [word]);

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen p-4 flex items-center justify-start flex-col gap-6">
        <h1 className="text-3xl font-bold text-teal-400 text-center">Word Dictionary App</h1>
        <div className="search-module flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-lg shadow-lg w-full max-w-[750px]">
          <input
            type="text"
            name="word"
            id="word"
            onMouseOver={(e) => (e.target.style.width = '600px')}
            onMouseOut={(e) => (e.target.style.width = '400px')}
            placeholder="Type word here"
            onChange={(e) => setWord(e.target.value)}
            value={word}
            className="p-2 rounded-md text-black w-full sm:w-[400px] outline-none border border-gray-400 focus:border-teal-400 transition-all duration-500 ease-in-out"
          />
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition w-full sm:w-auto"
            onClick={() => setSearch(!search)}
          >
            Search
          </button>
        </div>

        {search && word && data && (
          <div className="result w-full max-w-[750px]">
            <ul className="flex flex-col gap-4">
              {data.map((item, index) => (
                <li key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-teal-400">{item.word}</h2>
                  <p className="text-lg font-semibold text-white">{item.meanings[0].partOfSpeech.toUpperCase()}</p>
                  <p className="text-md font-semibold text-gray-400">
                    <span className="text-white text-lg">Definition:</span> {item.meanings[0].definitions[0].definition}
                  </p>
                  {item.meanings[0].definitions[0].example && (
                    <p className="text-md font-semibold text-gray-400">
                      <span className="text-white text-lg">Usage Example:</span> {item.meanings[0].definitions[0].example}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

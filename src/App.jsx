import React from "react";

import axios from "axios";

import "./App.css";
import Header from "./components/Header/Header";
import Repos from "./components/Repos/Repos";

function App() {
  const [search, setSearch] = React.useState("");
  const [repos, setRepos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getRepo = async () => {
    if (search === "") {
      setRepos([]);
      return;
    }
    try {
      setIsLoading(true);
      await axios
        .get(
          `https://api.github.com/search/repositories?q=${search}&per_page=10`
        )
        .then((res) => {
          setRepos(res.data.items);
          setIsLoading(false);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getRepo();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      return getRepo();
    }
  };
  return (
    <>
      <Header
        search={search}
        handleSubmit={handleSubmit}
        getRepo={getRepo}
        setSearch={setSearch}
      />
      <main>
        <Repos repos={repos} isLoading={isLoading} />
      </main>
    </>
  );
}

export default App;

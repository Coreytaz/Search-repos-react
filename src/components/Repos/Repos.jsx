import React from "react";
import "./Repos.css";

const Repos = ({ repos, isLoading }) => {
  console.log(repos);
  return (
    <>
      <div className="container">
        {isLoading
          ? "Загрузка...."
          : repos.length
          ? repos.map((repo) => (
              <div className="card" key={repo.id}>
                <div className="image">
                  <img
                    href={repo.url}
                    src={repo.owner.avatar_url}
                    alt={repos.name}
                    width={256}
                  />
                </div>
                <div className="content">
                  <h3>
                    <a href={repo.html_url} target="_blank">
                      {repo.name}
                    </a>
                  </h3>
                  <p>{repo.description}</p>
                </div>
              </div>
            ))
          : "Список пуст"}
      </div>
    </>
  );
};

export default Repos;

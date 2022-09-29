import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const data = await response.json();
    setUserData(data);
    setUser("");
  };

  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <button>Search User</button>
        </form>
      </div>
      <h3>Repositories</h3>
      <div className="App">
        {userData &&
          userData.map((items) => {
            const {
              name,
              open_issues: issues,
              owner: { login },
            } = items;

            return (
              <section key={items.id}>
                <h4>Reponame - {name}</h4>
                <p>Number of Issues - {issues}</p>
                <Link to={`/repo/${name}/issue/${login}`}>
                  <button>Issues</button>
                </Link>
              </section>
            );
          })}
      </div>
    </>
  );
}

export default App;

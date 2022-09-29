import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Issues = () => {
  const [issues, setIssues] = useState([]);

  const params = useParams();
  const { repoId: repo, issuesId: login } = params;
  //   console.log(params);
  //   console.log(login, repo);

  const handleRepo = async () => {
    const response = await fetch(
      `https://api.github.com/repos/${login}/${repo}/issues`
    );
    const data = await response.json();
    console.log(data);
    setIssues(data);
  };

  useEffect(() => {
    handleRepo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (issues.length === 0) {
    return (
      <div>
        <h2> This repo has no Issues</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Issue Title</h2>
      {issues &&
        issues.map((item) => {
          return (
            <div key={item.id} className="issue">
              <p>Issue ID: {item.id}</p>
              <p>Issue Title: {item.title}</p>
            </div>
          );
        })}
    </div>
  );
};
export default Issues;

import React, { useState, useEffect } from "react";

export function Main() {
  const [token, setToken] = useState(
    "figu_-bZOij5rHt-L77sp1ulftkT5hxU_8DeujnE8xNS5"
  );

  const [team, setTeam] = useState("910067698421453699");

  const [teamObj, setTeamObj] = useState({});

  console.log("ONe two there");

  useEffect(() => {
    if (token && team) {
      console.log(token, team);
      fetch(`https://api.figma.com/v1/teams/${team}/projects`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => {
        data.json().then((value) => {
          let teamResponse = value;
          console.log(value);
          setTeamObj(data);

          value.projects.forEach((project, index) => {
            fetch(`https://api.figma.com/v1/projects/${project.id}/files`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((data) => {
              data.json().then((value) => {
                console.log(value);
                let a = teamObj?.projects || [];
                let projects = [...a];
                projects[index] = { ...projects[index], files: value };
                setTeamObj({ ...teamObj, projects: projects });
              });
            });
          });
        });
      });
    }
  }, [token, team]);

  const onAuthorize = () => {
    window.open(
      "https://www.figma.com/oauth?client_id=L8BiP5yjFQMrMxCu7UgIHY&redirect_uri=http://127.0.0.1:3000/index.html&scope=file_read&state=123&response_type=implicit"
    );
  };

  console.log(teamObj);

  return (
    <div>
      <button onClick={onAuthorize}>Authorize</button>
      <div>Token</div>
      <input
        type="text"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />

      <div>Team Id</div>
      <input
        type="text"
        onChange={(e) => {
          setTeam(e.target.value);
        }}
      />

      <div>
        <div>Team Name: {teamObj.name}</div>

        <div
          style={{
            display: "grid",
            overflow: "auto",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {teamObj.projects?.map((project) => (
            <div key={project.id}>
              <div>{project.name}</div>
              <div>
                {project.files &&
                  project?.files?.files.map((file) => (
                    <div key={file.key}>
                      <div>{file.name}</div>

                      <div>
                        <iframe
                          title={file.name}
                          height="450"
                          width="800"
                          src={`https://www.figma.com/embed?embed_host=figtest&url=\https://www.figma.com/file/${file.key}/${file.name}`}
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* <div>
            <div>Project Name</div>
            <div>Embed</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "../node_modules/axios/index";

type IconData = {
  name: string;
  path: string;
};

const App: React.FC = () => {
  const [icons, setIcons] = useState<IconData[]>([]);

  useEffect(() => {
    axios
      .get("/icons")
      .then((response) => {
        console.log("Fetched icons data:", response.data);
        setIcons(response.data);
      })
      .catch((err) => {
        console.error("Error fetching icons:", err);
        //setError("Error fetching icons.");
      });
  }, []);

  return (
    <div className="App">
      <h1>Assets Browser</h1>
      <div className="icons-grid">
        {icons.map((icon) => (
          <div key={icon.name} className="icon-card">
            <img src={icon.path} alt={icon.name} />
            <p>{icon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

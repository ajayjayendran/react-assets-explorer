import React, { useEffect, useState } from "react";

type IconData = {
  name: string;
  path: string;
};

const App: React.FC = () => {
  const [icons, setIcons] = useState<IconData[]>([]);

  useEffect(() => {
    fetch("/icons")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response; // Parse the JSON response
      })
      .then((data) => {
        console.log("Fetched icons data:", data); // Log the received data
        //setIcons(data); // Update state with icons
      })
      .catch((err) => {
        console.error("Error fetching icons:", err);
        console.log("Error fetching icons."); // Handle errors
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

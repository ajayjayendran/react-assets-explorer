import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Asset {
  name: string;
  path: string;
}

const App: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get<Asset[]>("/api/assets");
        setAssets(response.data);
      } catch (err) {
        setError(
          "Failed to load assets. Make sure to run `assets-viewer init`."
        );
      }
    };

    fetchAssets();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="App">
      <h1>Assets Viewer</h1>
      <div className="assets-grid">
        {assets.map((asset) => (
          <div key={asset.name} className="asset-item">
            <img src={asset.path} alt={asset.name} />
            <p>{asset.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

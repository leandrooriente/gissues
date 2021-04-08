import { useEffect, useState } from "react";

export const Loading = (): React.ReactElement => {
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoaded(loaded + 10);
    }, 400);

    if (loaded === 100) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <main className="wrap results">
      <div className="nes-container with-title">
        <h3 className="title">Loading</h3>

        <progress className="nes-progress" value={loaded} max="100"></progress>
      </div>
    </main>
  );
};

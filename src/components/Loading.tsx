import React, { useEffect, useState } from "react";

export const Loading = (): React.ReactElement => {
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoaded(loaded + 20);
    }, 250);

    if (loaded === 100) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <progress
      className="nes-progress loader"
      value={loaded}
      max="100"
    ></progress>
  );
};

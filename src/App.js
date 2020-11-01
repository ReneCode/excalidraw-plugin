import { useEffect, useState, useRef } from "react";
import "./App.css";

const Preview = ({ snapshot }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(snapshot.imageData, 0, 0);
  }, [snapshot]);
  return <canvas ref={ref} width={snapshot.width} height={snapshot.height} />;
};

const App = () => {
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    console.log("init plugin");

    // got message from excalidraw-core
    const messageHandler = (message) => {
      if (message?.data?.source === "excalidraw") {
        switch (message.data.type) {
          case "createSnapshot":
            setSnapshot(message.data);
            break;
          default:
        }
      }
    };
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  // send message to excalidraw-core
  const handleClick = () => {
    if (window.parent) {
      window.parent.postMessage(
        { source: "excalidraw-plugin", type: "createSnapshot" },
        "*"
      );
    }
  };

  return (
    <div className="App">
      <p>first excalidraw-plugin</p>
      <button onClick={handleClick}>take snapshot</button>

      {snapshot && <Preview snapshot={snapshot} />}
    </div>
  );
};

export default App;

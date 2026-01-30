import { useEffect, useState } from "react";
import { getDeviceStatus } from "./web3/contract";

export default function App() {
  const [status, setStatus] = useState("LOADING");

  useEffect(() => {
    async function load() {
      const s = await getDeviceStatus("DEVICE_001");

      if (s === 0) setStatus("SAFE");
      if (s === 1) setStatus("LOCKED");
    }

    load();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>SentinelChain</h1>
      <h2>Device Status: {status}</h2>
    </div>
  );
}

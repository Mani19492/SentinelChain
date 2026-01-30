import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS";

export const ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "deviceId",
        "type": "string"
      }
    ],
    "name": "getStatus",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export async function getDeviceStatus(deviceId) {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    provider
  );

  const status = await contract.getStatus(deviceId);
  return Number(status);
}

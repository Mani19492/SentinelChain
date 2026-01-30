import { ethers } from 'ethers'

export const CONTRACT_ADDRESS = 'PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS'

export const ABI = [
  {
    inputs: [
      { internalType: 'string', name: 'deviceId', type: 'string' }
    ],
    name: 'getStatus',
    outputs: [
      { internalType: 'uint8', name: '', type: 'uint8' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'string', name: 'deviceId', type: 'string' },
      { internalType: 'string', name: 'logHash', type: 'string' }
    ],
    name: 'storeLogHash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'string', name: 'deviceId', type: 'string' }
    ],
    name: 'reportInfection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'string', name: 'deviceId', type: 'string' },
      { indexed: false, internalType: 'string', name: 'logHash', type: 'string' }
    ],
    name: 'LogHashStored',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'string', name: 'deviceId', type: 'string' }
    ],
    name: 'InfectionDetected',
    type: 'event'
  }
]

export async function getDeviceStatus(deviceId: string): Promise<number | undefined> {
  if (!window.ethereum) {
    console.warn('MetaMask not installed')
    return undefined
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send('eth_requestAccounts', [])

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    const status = await contract.getStatus(deviceId)
    return Number(status)
  } catch (error) {
    console.error('Error getting device status:', error)
    return undefined
  }
}

export async function storeLogHash(deviceId: string, logHash: string): Promise<string | undefined> {
  if (!window.ethereum) {
    console.warn('MetaMask not installed')
    return undefined
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    const tx = await contract.storeLogHash(deviceId, logHash)
    await tx.wait()
    return tx.hash
  } catch (error) {
    console.error('Error storing log hash:', error)
    return undefined
  }
}

export async function reportInfection(deviceId: string): Promise<string | undefined> {
  if (!window.ethereum) {
    console.warn('MetaMask not installed')
    return undefined
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    const tx = await contract.reportInfection(deviceId)
    await tx.wait()
    return tx.hash
  } catch (error) {
    console.error('Error reporting infection:', error)
    return undefined
  }
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void
    }
  }
}

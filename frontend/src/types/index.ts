export type DeviceStatus = 'safe' | 'warning' | 'locked'

export interface AttackEvent {
  id: string
  fileName: string
  entropy: number
  timestamp: Date
  status: 'safe' | 'warning' | 'infected'
}

export interface BlockchainRecord {
  id: string
  hash: string
  transactionId: string
  timestamp: Date
  blockNumber: number
}

export interface ContractEvent {
  id: string
  type: 'LogHashStored' | 'InfectionDetected' | 'KillSwitchActivated' | 'DeviceRegistered'
  data: Record<string, unknown>
  timestamp: Date
}

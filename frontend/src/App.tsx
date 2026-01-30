import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import SystemHealthPanel from './components/SystemHealthPanel'
import AttackTimeline from './components/AttackTimeline'
import BlockchainProof from './components/BlockchainProof'
import LiveEventStream from './components/LiveEventStream'
import { DeviceStatus, AttackEvent, BlockchainRecord, ContractEvent } from './types'

// Mock data generator for demo
const generateMockData = () => {
  const events: AttackEvent[] = [
    {
      id: '1',
      fileName: 'document.pdf',
      entropy: 3.2,
      timestamp: new Date(Date.now() - 300000),
      status: 'safe'
    },
    {
      id: '2', 
      fileName: 'report.xlsx',
      entropy: 4.1,
      timestamp: new Date(Date.now() - 240000),
      status: 'safe'
    },
    {
      id: '3',
      fileName: 'backup.zip',
      entropy: 6.8,
      timestamp: new Date(Date.now() - 180000),
      status: 'warning'
    }
  ]

  const records: BlockchainRecord[] = [
    {
      id: '1',
      hash: '0x7a8f2c...9d4e1b',
      transactionId: '0xabc123...def456',
      timestamp: new Date(Date.now() - 120000),
      blockNumber: 45892341
    }
  ]

  return { events, records }
}

export default function App() {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>('safe')
  const [attackEvents, setAttackEvents] = useState<AttackEvent[]>([])
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainRecord[]>([])
  const [contractEvents, setContractEvents] = useState<ContractEvent[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [deviceId] = useState('DEVICE_001')

  useEffect(() => {
    // Initialize with mock data
    const { events, records } = generateMockData()
    setAttackEvents(events)
    setBlockchainRecords(records)

    // Add initial contract event
    setContractEvents([
      {
        id: '1',
        type: 'LogHashStored',
        data: { deviceId: 'DEVICE_001', hash: '0x7a8f2c...9d4e1b' },
        timestamp: new Date(Date.now() - 60000)
      }
    ])
  }, [])

  // Simulate ransomware attack for demo
  const simulateAttack = () => {
    const newEvent: AttackEvent = {
      id: Date.now().toString(),
      fileName: 'encrypted_file.locked',
      entropy: 7.89,
      timestamp: new Date(),
      status: 'infected'
    }
    
    setAttackEvents(prev => [newEvent, ...prev])
    setDeviceStatus('locked')
    
    // Add blockchain record
    const newRecord: BlockchainRecord = {
      id: Date.now().toString(),
      hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
      transactionId: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
      timestamp: new Date(),
      blockNumber: 45892342 + Math.floor(Math.random() * 100)
    }
    setBlockchainRecords(prev => [newRecord, ...prev])

    // Add contract events
    setContractEvents(prev => [
      {
        id: Date.now().toString() + '_infection',
        type: 'InfectionDetected',
        data: { deviceId, entropy: 7.89 },
        timestamp: new Date()
      },
      {
        id: Date.now().toString() + '_killswitch',
        type: 'KillSwitchActivated',
        data: { deviceId, status: 'LOCKED' },
        timestamp: new Date()
      },
      ...prev
    ])
  }

  const resetDemo = () => {
    setDeviceStatus('safe')
    const { events, records } = generateMockData()
    setAttackEvents(events)
    setBlockchainRecords(records)
    setContractEvents([
      {
        id: '1',
        type: 'LogHashStored',
        data: { deviceId: 'DEVICE_001', hash: '0x7a8f2c...9d4e1b' },
        timestamp: new Date(Date.now() - 60000)
      }
    ])
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <Navbar 
        isConnected={isConnected} 
        onConnect={() => setIsConnected(true)}
        deviceId={deviceId}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Demo Controls */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex gap-4 justify-center"
        >
          <button
            onClick={simulateAttack}
            disabled={deviceStatus === 'locked'}
            className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold 
                       hover:bg-destructive/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg shadow-destructive/25"
          >
            🦠 Simulate Ransomware Attack
          </button>
          <button
            onClick={resetDemo}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold 
                       hover:bg-secondary/80 transition-all border border-border"
          >
            🔄 Reset Demo
          </button>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Health Panel - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SystemHealthPanel 
              status={deviceStatus} 
              deviceId={deviceId}
              entropyThreshold={7.0}
            />
          </motion.div>

          {/* Attack Timeline - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AttackTimeline events={attackEvents} />
          </motion.div>

          {/* Blockchain Evidence - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <BlockchainProof records={blockchainRecords} />
          </motion.div>

          {/* Live Event Stream - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <LiveEventStream events={contractEvents} />
          </motion.div>
        </div>
      </main>
    </div>
  )
}

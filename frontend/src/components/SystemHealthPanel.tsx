import { motion } from 'framer-motion'
import { Shield, ShieldAlert, ShieldOff, Activity, Cpu, HardDrive } from 'lucide-react'
import { DeviceStatus } from '../types'

interface SystemHealthPanelProps {
  status: DeviceStatus
  deviceId: string
  entropyThreshold: number
}

export default function SystemHealthPanel({ status, deviceId, entropyThreshold }: SystemHealthPanelProps) {
  const statusConfig = {
    safe: {
      icon: Shield,
      label: 'SYSTEM SECURE',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30',
      glowClass: 'glow-green',
      description: 'All systems operational. No threats detected.'
    },
    warning: {
      icon: ShieldAlert,
      label: 'ELEVATED THREAT',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30',
      glowClass: 'glow-warning',
      description: 'Suspicious activity detected. Monitoring closely.'
    },
    locked: {
      icon: ShieldOff,
      label: 'SYSTEM LOCKED',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30',
      glowClass: 'glow-red',
      description: 'Ransomware detected! Kill switch activated.'
    }
  }

  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <div className={`
      relative rounded-2xl border ${config.borderColor} ${config.bgColor} 
      p-6 overflow-hidden backdrop-blur-sm ${config.glowClass}
    `}>
      {/* Scanline effect */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-50" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-muted-foreground" />
            System Health
          </h2>
          <span className={`text-xs font-mono ${config.color} px-2 py-1 rounded ${config.bgColor}`}>
            LIVE
          </span>
        </div>

        {/* Main Status Display */}
        <div className="flex flex-col items-center py-8">
          <motion.div
            className={`relative p-6 rounded-full ${config.bgColor} mb-4`}
            animate={status === 'locked' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: status === 'locked' ? Infinity : 0 }}
          >
            <StatusIcon className={`w-16 h-16 ${config.color}`} />
            {status === 'safe' && (
              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${config.borderColor}`}
                animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          <motion.h3 
            className={`text-2xl font-bold font-mono ${config.color} mb-2`}
            key={status}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {config.label}
          </motion.h3>
          
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            {config.description}
          </p>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-background/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Entropy Threshold</span>
            </div>
            <p className="text-lg font-mono font-semibold text-foreground">{entropyThreshold.toFixed(1)}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-background/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Device ID</span>
            </div>
            <p className="text-sm font-mono font-semibold text-foreground truncate">{deviceId}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

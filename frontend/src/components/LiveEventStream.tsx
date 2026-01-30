import { motion, AnimatePresence } from 'framer-motion'
import { Radio, Zap, AlertOctagon, Database, Shield } from 'lucide-react'
import { ContractEvent } from '../types'

interface LiveEventStreamProps {
  events: ContractEvent[]
}

export default function LiveEventStream({ events }: LiveEventStreamProps) {
  const getEventConfig = (type: ContractEvent['type']) => {
    switch (type) {
      case 'LogHashStored':
        return {
          icon: Database,
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          label: 'Hash Stored'
        }
      case 'InfectionDetected':
        return {
          icon: AlertOctagon,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          label: 'Infection Detected'
        }
      case 'KillSwitchActivated':
        return {
          icon: Zap,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          label: 'Kill Switch Activated'
        }
      case 'DeviceRegistered':
        return {
          icon: Shield,
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'Device Registered'
        }
      default:
        return {
          icon: Radio,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          label: type
        }
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm h-full relative overflow-hidden">
      {/* Animated background pulse for live effect */}
      <motion.div
        className="absolute inset-0 bg-primary/5"
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Radio className="w-5 h-5 text-muted-foreground" />
            Live Event Stream
          </h2>
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-success"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs text-muted-foreground">Smart Contract Events</span>
          </div>
        </div>

        {/* Event Stream */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 font-mono text-sm">
          <AnimatePresence mode="popLayout">
            {events.map((event) => {
              const config = getEventConfig(event.type)
              const EventIcon = config.icon

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 50, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    p-3 rounded-lg border border-border bg-background/30
                    hover:bg-background/50 transition-colors
                  `}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-1.5 rounded ${config.bgColor}`}>
                      <EventIcon className={`w-3 h-3 ${config.color}`} />
                    </div>
                    <span className={`font-semibold ${config.color}`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {formatTime(event.timestamp)}
                    </span>
                  </div>
                  
                  {/* Event Data */}
                  <div className="text-xs text-muted-foreground bg-secondary/30 p-2 rounded">
                    <pre className="whitespace-pre-wrap break-all">
                      {JSON.stringify(event.data, null, 2)}
                    </pre>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {events.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Radio className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Listening for contract events...</p>
            </div>
          )}
        </div>

        {/* Terminal-style footer */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-primary">$</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
            <span>listening to SentinelChain contract events...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

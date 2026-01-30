import { motion, AnimatePresence } from 'framer-motion'
import { Clock, FileText, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import { AttackEvent } from '../types'

interface AttackTimelineProps {
  events: AttackEvent[]
}

export default function AttackTimeline({ events }: AttackTimelineProps) {
  const getStatusConfig = (status: AttackEvent['status']) => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/30'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/30'
        }
      case 'infected':
        return {
          icon: XCircle,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/30'
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

  const getEntropyColor = (entropy: number) => {
    if (entropy >= 7.0) return 'text-destructive'
    if (entropy >= 5.0) return 'text-warning'
    return 'text-success'
  }

  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          Attack Timeline
        </h2>
        <span className="text-xs text-muted-foreground">
          {events.length} events
        </span>
      </div>

      {/* Timeline */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {events.map((event, index) => {
            const config = getStatusConfig(event.status)
            const StatusIcon = config.icon

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  relative p-4 rounded-xl border ${config.borderColor} ${config.bgColor}
                  hover:bg-opacity-20 transition-all
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${config.bgColor}`}>
                    <StatusIcon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-3 h-3 text-muted-foreground" />
                      <span className="font-mono text-sm text-foreground truncate">
                        {event.fileName}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Entropy:</span>
                        <span className={`font-mono font-semibold ${getEntropyColor(event.entropy)}`}>
                          {event.entropy.toFixed(2)}
                        </span>
                      </div>
                      
                      <span className="text-muted-foreground font-mono">
                        {formatTime(event.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Entropy bar */}
                <div className="mt-3 h-1 bg-background/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(event.entropy / 8) * 100}%` }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      event.entropy >= 7.0 ? 'bg-destructive' :
                      event.entropy >= 5.0 ? 'bg-warning' : 'bg-success'
                    }`}
                  />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {events.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No file events recorded</p>
          </div>
        )}
      </div>
    </div>
  )
}

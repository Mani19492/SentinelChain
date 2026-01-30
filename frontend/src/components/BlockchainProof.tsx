import { motion, AnimatePresence } from 'framer-motion'
import { Link, Hash, ExternalLink, Clock, Blocks } from 'lucide-react'
import { BlockchainRecord } from '../types'

interface BlockchainProofProps {
  records: BlockchainRecord[]
}

export default function BlockchainProof({ records }: BlockchainProofProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  const openPolygonScan = (txId: string) => {
    // In production, this would open the actual transaction
    window.open(`https://polygonscan.com/tx/${txId}`, '_blank')
  }

  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Link className="w-5 h-5 text-muted-foreground" />
          Blockchain Evidence
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-mono">
            Polygon
          </span>
        </div>
      </div>

      {/* Records */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {records.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-border bg-background/50 hover:border-primary/30 transition-all group"
            >
              {/* Hash */}
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">SHA-256 Hash</span>
              </div>
              <code className="block font-mono text-sm text-foreground bg-secondary/50 p-2 rounded-lg mb-4 truncate">
                {record.hash}
              </code>

              {/* Transaction ID */}
              <div className="flex items-center gap-2 mb-3">
                <Blocks className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Transaction ID</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <code className="flex-1 font-mono text-sm text-foreground bg-secondary/50 p-2 rounded-lg truncate">
                  {record.transactionId}
                </code>
                <button
                  onClick={() => openPolygonScan(record.transactionId)}
                  className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group-hover:bg-primary/10"
                  title="View on PolygonScan"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(record.timestamp)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Block:</span>
                  <span className="font-mono text-primary">#{record.blockNumber}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {records.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Blocks className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No blockchain records yet</p>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-xs text-muted-foreground">
          <span className="text-primary font-semibold">Immutable Evidence:</span> All hashes are permanently stored on the Polygon blockchain and cannot be modified or deleted.
        </p>
      </div>
    </div>
  )
}

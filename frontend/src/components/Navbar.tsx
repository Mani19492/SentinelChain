import { motion } from 'framer-motion'
import { Shield, Wallet, Wifi } from 'lucide-react'

interface NavbarProps {
  isConnected: boolean
  onConnect: () => void
  deviceId: string
}

export default function Navbar({ isConnected, onConnect, deviceId }: NavbarProps) {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative">
              <Shield className="w-8 h-8 text-primary" />
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Sentinel<span className="text-primary">Chain</span>
              </h1>
              <p className="text-xs text-muted-foreground">Immutable Cyber Forensics</p>
            </div>
          </motion.div>

          {/* Center - Device Info */}
          <motion.div 
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg border border-border"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs text-muted-foreground">Device ID:</span>
            <code className="font-mono text-sm text-primary">{deviceId}</code>
          </motion.div>

          {/* Wallet Connection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={onConnect}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                ${isConnected 
                  ? 'bg-primary/10 text-primary border border-primary/30' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }
              `}
            >
              {isConnected ? (
                <>
                  <Wifi className="w-4 h-4" />
                  <span className="hidden sm:inline">Connected</span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">Connect Wallet</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </nav>
  )
}

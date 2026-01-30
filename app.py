import subprocess
import sys
import os
import time

print("🚀 Starting SentinelChain System...\n")

# ------------------------
# Start Backend (Agent)
# ------------------------
print("🛡 Starting Backend Agent...")
backend_process = subprocess.Popen(
    [sys.executable, "app.py"],
    cwd=os.path.join(os.getcwd(), "agent")
)

time.sleep(3)

# ------------------------
# Start Frontend (React)
# ------------------------
print("🌐 Starting Frontend Dashboard...")
frontend_process = subprocess.Popen(
    ["npm", "run", "dev"],
    cwd=os.path.join(os.getcwd(), "frontend"),
    shell=True
)

print("\n✅ SentinelChain is running")
print("👉 Backend: File monitoring active")
print("👉 Frontend: http://localhost:5173\n")

try:
    backend_process.wait()
    frontend_process.wait()
except KeyboardInterrupt:
    print("\n🛑 Shutting down SentinelChain...")
    backend_process.terminate()
    frontend_process.terminate()

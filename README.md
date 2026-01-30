SentinelChain

SentinelChain is a ransomware detection system that monitors file entropy to
identify encryption-based attacks in real time. When abnormal behavior is
detected, immutable forensic proof is recorded on the blockchain and displayed
through a web dashboard.

---------------------------------------------------------------------

SYSTEM OVERVIEW

The project consists of three main components:

1. Python Backend Agent
   - Monitors a protected folder
   - Calculates Shannon entropy of files
   - Detects ransomware-style encryption
   - Sends immutable proof to blockchain

2. Blockchain Smart Contract
   - Stores infection status
   - Provides tamper-proof evidence

3. Frontend Dashboard
   - Reads blockchain state
   - Displays SAFE or LOCKED device status

---------------------------------------------------------------------
```text
SentinelChain/
│
├── app.py                     # Main launcher for the entire system
│
├── agent/                     # Backend security agent
│   ├── app.py                 # Agent entry point
│   ├── watcher.py             # Monitors file system changes
│   ├── entropy.py             # Detects suspicious files using entropy analysis
│   ├── blockchain.py          # Handles blockchain logging and verification
│   ├── config.py              # Configuration settings
│   ├── requirements.txt       # Python dependencies
│   └── monitor/               # Directory being continuously scanned
│
├── frontend/                  # Web-based dashboard UI
│
└── smart-contract/            # Solidity smart contracts for integrity storage
```


---------------------------------------------------------------------

REQUIREMENTS

Python:
- Python 3.10 or higher
- pip

Node:
- Node.js 18+
- npm

Blockchain:
- MetaMask wallet
- Polygon Amoy Testnet
- Test POL balance

---------------------------------------------------------------------

INSTALLATION STEPS (NEW SYSTEM)

STEP 1: Clone repository

    git clone https://github.com/your-username/SentinelChain.git
    cd SentinelChain


STEP 2: Create virtual environment

    python -m venv venv


STEP 3: Activate virtual environment

Windows:
    venv\\Scripts\\activate

Linux / macOS:
    source venv/bin/activate


STEP 4: Install backend dependencies

    cd agent
    pip install -r requirements.txt


STEP 5: Configure blockchain settings

Open:
    agent/config.py

Update:

    RPC_URL = "https://rpc-amoy.polygon.technology/"
    PRIVATE_KEY = "YOUR_TEST_WALLET_PRIVATE_KEY"
    CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS"
    DEVICE_ID = "DEVICE_001"

NOTE:
- Use test wallet only
- Never commit private key to GitHub


STEP 6: Install frontend dependencies

    cd ../frontend
    npm install


STEP 7: Run the complete system

From project root:

    python app.py


---------------------------------------------------------------------

HOW THE SYSTEM WORKS

1. Backend watches the folder:
       agent/monitor/

2. Any file added or modified is read as binary

3. Entropy is calculated

4. If entropy > 7.0:
       - File is treated as encrypted
       - Ransomware suspected
       - Blockchain transaction is sent

5. Smart contract stores device status as LOCKED

6. Frontend reads blockchain and shows status

---------------------------------------------------------------------

TESTING RANSOMWARE DETECTION

Create a simulated encrypted file:

    python -c "import os; open('agent/monitor/test.bin','wb').write(os.urandom(4096))"

This will trigger detection and send a blockchain transaction.

---------------------------------------------------------------------

LIMITATIONS

- Detects only encryption-based ransomware
- Does not detect trojans, viruses, or scripts
- Folder-based monitoring only

---------------------------------------------------------------------

DISCLAIMER

This project is intended for academic, research, and demonstration purposes.
Do not use in production environments without additional security layers.

---------------------------------------------------------------------

AUTHOR

SentinelChain – Cyber Forensics & Blockchain Security Project

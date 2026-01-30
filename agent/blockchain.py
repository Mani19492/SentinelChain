from web3 import Web3
from config import RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS

w3 = Web3(Web3.HTTPProvider(RPC_URL))
account = w3.eth.account.from_key(PRIVATE_KEY)

abi = [
    {
        "inputs": [{"internalType": "string", "name": "deviceId", "type": "string"}],
        "name": "reportInfection",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    }
]

checksum_address = Web3.to_checksum_address(CONTRACT_ADDRESS)
contract = w3.eth.contract(address=checksum_address, abi=abi)

def report_infection(device_id):
    tx = contract.functions.reportInfection(device_id).build_transaction({
        "from": account.address,
        "nonce": w3.eth.get_transaction_count(account.address),
        "gas": 200000,
        "gasPrice": w3.to_wei("30", "gwei")
    })

    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    print("🚨 Infection reported on blockchain")
    print("TX:", tx_hash.hex())

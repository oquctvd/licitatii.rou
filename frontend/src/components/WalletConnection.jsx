import { useState } from 'react'
import { ethers } from 'ethers'

function WalletConnection({ account, network, onConnect, onDisconnect }) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Please install MetaMask!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      onConnect()
    } catch (error) {
      console.error('Error connecting wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <div className="wallet-connection">
      {account ? (
        <div className="wallet-info">
          <span className="network">
            {network?.name === 'sepolia' ? '🧪 Sepolia Testnet' : `Network: ${network?.name}`}
          </span>
          <span className="account">{formatAddress(account)}</span>
          <button onClick={onDisconnect} className="btn-disconnect">
            Disconnect
          </button>
        </div>
      ) : (
        <button 
          onClick={handleConnect} 
          disabled={isConnecting}
          className="btn-connect"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  )
}

export default WalletConnection

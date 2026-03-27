import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import './App.css'
import WalletConnection from './components/WalletConnection'
import AuctionList from './components/AuctionList'
import CreateAuction from './components/CreateAuction'

function App() {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [network, setNetwork] = useState(null)

  useEffect(() => {
    checkIfWalletConnected()
  }, [])

  const checkIfWalletConnected = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          connectWallet(accounts[0])
        }
      }
    } catch (error) {
      console.error('Error checking wallet:', error)
    }
  }

  const connectWallet = async (account) => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Please install MetaMask!')
        return
      }

      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()

      setAccount(account)
      setProvider(provider)
      setSigner(signer)
      setNetwork(network)
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
    setNetwork(null)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🔗 Licitatii.rou - Blockchain Auctions</h1>
        <WalletConnection 
          account={account} 
          network={network}
          onConnect={() => checkIfWalletConnected()}
          onDisconnect={disconnectWallet}
        />
      </header>

      <main className="app-main">
        {account ? (
          <>
            <CreateAuction account={account} signer={signer} />
            <AuctionList provider={provider} signer={signer} />
          </>
        ) : (
          <div className="wallet-required">
            <p>Please connect your wallet to start using the application</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
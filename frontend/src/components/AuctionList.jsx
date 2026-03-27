import { useState, useEffect } from 'react'
import AuctionCard from './AuctionCard'

function AuctionList({ provider, signer }) {
  const [auctions, setAuctions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (provider) {
      loadAuctions()
    }
  }, [provider])

  const loadAuctions = async () => {
    setLoading(true)
    try {
      // TODO: Load auctions from blockchain
      // This will be implemented after smart contracts are deployed
      console.log('Loading auctions...')
    } catch (error) {
      console.error('Error loading auctions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auction-list">
      <h2>Active Auctions</h2>
      {loading ? (
        <p>Loading auctions...</p>
      ) : auctions.length === 0 ? (
        <p>No auctions found</p>
      ) : (
        <div className="auctions-grid">
          {auctions.map((auction, index) => (
            <AuctionCard key={index} auction={auction} signer={signer} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AuctionList
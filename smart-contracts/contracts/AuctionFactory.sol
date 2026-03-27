// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Auction.sol";

contract AuctionFactory {
    Auction[] public auctions;
    mapping(address => Auction[]) public userAuctions;
    
    event AuctionCreated(address indexed creator, address indexed auctionAddress, string title);
    
    function createAuction(
        string memory _title,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _minimumBid
    ) public returns (address) {
        Auction newAuction = new Auction(
            _title,
            _description,
            _startTime,
            _endTime,
            _minimumBid
        );
        
        auctions.push(newAuction);
        userAuctions[msg.sender].push(newAuction);
        
        emit AuctionCreated(msg.sender, address(newAuction), _title);
        return address(newAuction);
    }
    
    function getAuctionsCount() public view returns (uint256) {
        return auctions.length;
    }
    
    function getAuction(uint256 index) public view returns (address) {
        return address(auctions[index]);
    }
    
    function getUserAuctionsCount(address user) public view returns (uint256) {
        return userAuctions[user].length;
    }
    
    function getUserAuction(address user, uint256 index) public view returns (address) {
        return address(userAuctions[user][index]);
    }
}
pragma solidity ^0.5.1;

import "../RollupBurnAuction.sol";

contract RollupBurnAuctionTest is RollupBurnAuction {

    constructor(address _rollup) RollupBurnAuction(_rollup) public {}

    uint public blockNumber;

    function getBlockNumber() public view returns (uint) {
        return blockNumber;
    }

    function setBlockNumber(uint bn) public {
        blockNumber = bn;
    }

    function forgeBatch(
        address payable beneficiaryAddress,
        uint[2] calldata proofA,
        uint[2][2] calldata proofB,
        uint[2] calldata proofC,
        uint[8] calldata input
     ) external {
        require(auction[currentSlot()].initialized, "Auction has not been initialized");
        require(msg.sender == auction[currentSlot()].operator, "Sender is not current winner");
    }
}
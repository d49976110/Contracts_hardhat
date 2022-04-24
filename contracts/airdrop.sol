// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract NFTAirdrop {
    struct Airdrop {
        address nft;
        uint256 id;
    }
    uint256 public nextAirdropId;
    address public admin;
    mapping(uint256 => Airdrop) public airdrops;
    mapping(address => bool) public recipients;

    constructor() {
        admin = msg.sender;
    }

    function addAirdrops(Airdrop[] memory _airdrops) external {
        uint256 _nextAirdropId = nextAirdropId;
        for (uint256 i = 0; i < _airdrops.length; i++) {
            airdrops[_nextAirdropId] = _airdrops[i];
            IERC721(_airdrops[i].nft).transferFrom(msg.sender, address(this), _airdrops[i].id);
            _nextAirdropId++;
        }
    }

    function addRecipients(address[] memory _recipients) external {
        require(msg.sender == admin, 'only admin');
        for (uint256 i = 0; i < _recipients.length; i++) {
            recipients[_recipients[i]] = true;
        }
    }

    function removeRecipients(address[] memory _recipients) external {
        require(msg.sender == admin, 'only admin');
        for (uint256 i = 0; i < _recipients.length; i++) {
            recipients[_recipients[i]] = false;
        }
    }

    function claim() external {
        require(recipients[msg.sender] == true, 'recipient not registered');
        recipients[msg.sender] = false;
        Airdrop storage airdrop = airdrops[nextAirdropId];
        IERC721(airdrop.nft).transferFrom(address(this), msg.sender, airdrop.id);
        nextAirdropId++;
    }
}

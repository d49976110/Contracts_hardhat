// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import './ERC1155/ERC1155.sol';
import './ERC1155/IERC1155.sol';

// import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract test1155 is ERC1155 {
    constructor(string memory _string) ERC1155(_string) {}

    uint256 totalSupply = 0;

    function mint() external {
        totalSupply++;
        _mint(msg.sender, totalSupply, 1, '0x');
    }

    function getInterface() external view returns(bytes4){
        return type(IERC1155).interfaceId;
    }
}

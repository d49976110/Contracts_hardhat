// SPDX-License-Identifier:MIT
pragma solidity ^0.8;

import '@rari-capital/solmate/src/tokens/ERC20.sol';
import 'hardhat/console.sol';

contract Token is ERC20 {
    constructor() ERC20('TEST', 'TST', 6) {}

    function mint(address reciever, uint256 amount) external {
        _mint(reciever, amount);
    }
}

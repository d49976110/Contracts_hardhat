//SPDX-License-Identifier:MIT

pragma solidity ^0.8;

contract TokenBank {
    address[] internal investors;
    mapping(address => uint256) internal balances;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        msg.sender == owner;
        _;
    }

    //function saves an investor address on an array
    function registerInvestor(address _investor) public onlyOwner {
        require(_investor != address(0));
        investors.push(_investor);
    }

    function calulateDividendAccured(address _investor) internal returns (uint256) {
        //perform your calculations here and return the dividends
    }

    //bad practice
    function distributeDividends() public onlyOwner {
        for (uint256 i = 0; i < investors.length; i++) {
            uint256 amount = calulateDividendAccured(investors[i]);
            //amount is what due to the investor
            balances[investors[i]] = 0;
            payable(investors[i]).transfer(amount); //pushing ether to address
        }
    }
}

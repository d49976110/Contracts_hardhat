// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract TimeWeightStaking {
    mapping(address => uint256) userRewardPerTokenPaid;
    mapping(address => uint256) rewards;
    mapping(address => uint256) balances;

    uint256 RewardRate = 100;
    uint256 rewardPerTokenStored;
    uint256 totalStaking;
    uint256 lastUpdateTime;
    IERC20 token;

    constructor(address _token) {
        lastUpdateTime = block.timestamp;
        token = IERC20(_token);
    }

    function stake(uint256 _amount) external {
        updateReward();
        totalStaking += _amount;
        balances[msg.sender] += _amount;
    }

    function withdraw(uint256 _amount) external {
        updateReward();
        totalStaking -= _amount;
        balances[msg.sender] -= _amount;
    }

    function updateReward() public {
        if (totalStaking > 0) {
            uint256 timePeriod = block.timestamp - lastUpdateTime;
            rewardPerTokenStored += (RewardRate * timePeriod) / totalStaking;
            lastUpdateTime = block.timestamp;
            userRewardPerTokenPaid[msg.sender] = rewardPerTokenStored;
        }
        _earned();
    }

    function _earned() internal {
        rewards[msg.sender] += balances[msg.sender] += balances[msg.sender] * (rewardPerTokenStored - userRewardPerTokenPaid[msg.sender]);
    }
}

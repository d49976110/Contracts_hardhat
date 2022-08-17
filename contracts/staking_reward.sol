// SPDX-License-Identifier: MIT
pragma solidity >0.8.0 <=0.9.0;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract StakingReward {
    mapping(address => uint256) balance;
    mapping(address => uint256) userReward;
    mapping(address => uint256) userPerTokenPaid;

    uint256 public totalSupply;
    uint256 public lastUpdate;
    uint256 public perTokenReward;
    uint256 public rewardRate;

    IERC20 stakingToken;
    IERC20 rewardToken;

    constructor(address token1, address token2) {
        stakingToken = IERC20(token1);
        rewardToken = IERC20(token2);
    }

    modifier updateReward() {
        //計算變更後的pertokenreward
        if (totalSupply > 0) {
            uint256 period = block.timestamp - lastUpdate;
            perTokenReward += (rewardRate * period) / totalSupply;
        }
        lastUpdate = block.timestamp;
        //計算該user到當前為止的獎勵
        userReward[msg.sender] += (perTokenReward - userPerTokenPaid[msg.sender]) * balance[msg.sender];
        //更新user此次動作時間下的pertokenreward
        userPerTokenPaid[msg.sender] = perTokenReward;
        _;
    }

    function stake(uint256 amount) external updateReward {
        require(amount > 0, 'Amount must greater than 0');
        stakingToken.transferFrom(msg.sender, address(this), amount);
        balance[msg.sender] += amount;
        totalSupply += amount;
    }

    function withdraw(uint256 amount) external updateReward {
        require(amount > 0, 'Amount must greater than 0');
        balance[msg.sender] -= amount;
        totalSupply -= amount;
        stakingToken.transfer(msg.sender, amount);
    }

    function getReward() external updateReward {
        uint256 reward = userReward[msg.sender];
        userReward[msg.sender] = 0;
        rewardToken.transfer(msg.sender, reward);
    }
}

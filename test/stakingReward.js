const {expect} = require('chai');
const {ethers} = require('hardhat');

let contract, token1, token2;

describe('Staking Reward', function () {
    init('StakingReward');
    it('mint', async function () {
        await token1.mint(owner.address, 1000);
        await token1.connect(owner).approve(contract.address, 1000);
        await token1.mint(addr1.address, 2000);
        await token1.connect(addr1).approve(contract.address, 2000);
        await token1.mint(addr2.address, 1000);
        await token1.connect(addr2).approve(contract.address, 1000);
    });

    it('stake & withdraw', async function () {
        await contract.stake(1000);
        await ethers.provider.send('evm_increaseTime', [10]);
        await ethers.provider.send('evm_mine');

        await contract.connect(addr1).stake(2000);
        await ethers.provider.send('evm_increaseTime', [20]);
        await ethers.provider.send('evm_mine');

        await contract.connect(addr2).stake(1000);
        await ethers.provider.send('evm_increaseTime', [20]);
        await ethers.provider.send('evm_mine');

        await contract.getReward();
        let withdrawAmount1 = await token1.balanceOf(owner.address);
        console.log('withdrawAmount1', withdrawAmount1);

        await contract.connect(addr1).getReward();
        let withdrawAmount2 = await token1.balanceOf(addr1.address);
        console.log('withdrawAmount2', withdrawAmount2);

        await contract.connect(addr2).getReward();
        let withdrawAmount3 = await token1.balanceOf(addr2.address);
        console.log('withdrawAmount3', withdrawAmount3);
    });
});

function init(contractName) {
    before(async () => {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        const Token1 = await ethers.getContractFactory('Token');
        token1 = await Token1.deploy();

        // const Token2 = await ethers.getContractFactory('Token');
        // token2 = await Token2.deploy();

        const Contract = await ethers.getContractFactory(contractName);
        contract = await Contract.deploy(token1.address);
    });
}

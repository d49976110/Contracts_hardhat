const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('Create2', function () {
    let create2;
    beforeEach(async () => {
        [owner, ...addrs] = await ethers.getSigners();
        const Create2 = await ethers.getContractFactory('Create2Factory');
        create2 = await Create2.deploy();
    });
    it('Address should be the same', async function () {
        const bytecode = await create2.getBytesCode(owner.address);
        const address = await create2.getAddress(bytecode, 777);
        await expect(create2.deploy(777)).to.emit(create2, 'Deploy').withArgs(address);
    });
});

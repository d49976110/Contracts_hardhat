const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('Zeta', function () {
    let max_supply = 999;
    let reserve = 99;
    let price = 0.001;

    before(async () => {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        const Zeta = await ethers.getContractFactory('Zeta');
        Zeta_D = await Zeta.deploy();
        ZetaInstance = await Zeta_D.deployed();
    });

    it('Rest supply', async function () {
        expect(await Zeta_D.getRestSupply()).to.equal(max_supply);
    });
    it('Init mint', async () => {
        await ZetaInstance.init_mint(reserve);
        expect(await ZetaInstance.balanceOf(owner.address)).to.equal(reserve);
    });
    it('SetTime & active', async () => {
        let now = Math.floor(Date.now() / 1000);

        await ZetaInstance.setTime(now - 1000, now + 86400);
        const result = await ZetaInstance.getTime();

        expect(result._startTime).to.equal(now - 1000);
        expect(result._endTime).to.equal(now + 86400);

        await ZetaInstance.flipSaleActive();
        expect(await ZetaInstance.getSaleActive()).to.equal(true);
    });
    it('Add to white list', async () => {
        await ZetaInstance.addToWhitelist([owner.address, addr1.address, addr2.address]);
        expect(await ZetaInstance.checkWhiteList(owner.address)).to.equal(true);
        expect(await ZetaInstance.checkWhiteList(addr2.address)).to.equal(true);
    });

    it('Owner mint', async () => {
        await ZetaInstance.mint(1, {value: ethers.utils.parseEther(price.toString())});
        expect(await ZetaInstance.balanceOf(owner.address)).to.equal(100);
    });

    it('User mint', async () => {
        await ZetaInstance.connect(addr1).mint(1, {value: ethers.utils.parseEther(price.toString())});
        expect(await ZetaInstance.balanceOf(addr1.address)).to.equal(1);

        expect(await ZetaInstance.getRestSupply()).to.equal(898);
    });

    it('Should revert cause not enough ETH', async () => {
        await expect(
            ZetaInstance.connect(addr2).mint(100, {value: ethers.utils.parseEther((10 * price).toString())})
        ).to.be.revertedWith('Not enough ether to mint');
    });

    it('Another user mint', async () => {
        await ZetaInstance.connect(addr2).mint(100, {value: ethers.utils.parseEther((100 * price).toString())});
        expect(await ZetaInstance.balanceOf(addr2.address)).to.equal(100);
        expect(await ZetaInstance.getRestSupply()).to.equal(798);
    });
});

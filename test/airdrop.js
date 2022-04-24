const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('airdrop', function () {
    let nft, airdrop;

    beforeEach(async () => {
        [owner, recipient1, recipient2, recipient3, ...addrs] = await ethers.getSigners();

        let nft_c = await ethers.getContractFactory('NFT');
        nft = await nft_c.deploy();

        let airdrop_c = await ethers.getContractFactory('NFTAirdrop');
        airdrop = await airdrop_c.deploy();

        await nft.setApprovalForAll(airdrop.address, true);
    });

    it('should airdrop', async () => {
        await airdrop.addAirdrops([
            {nft: nft.address, id: 0},
            {nft: nft.address, id: 1},
            {nft: nft.address, id: 2},
        ]);
        await airdrop.addRecipients([recipient1.address, recipient2.address, recipient3.address]);
        await airdrop.connect(recipient1).claim();
        await airdrop.connect(recipient2).claim();
        await airdrop.connect(recipient3).claim();
        const owner1 = await nft.ownerOf(0);
        const owner2 = await nft.ownerOf(1);
        const owner3 = await nft.ownerOf(2);
        expect(owner1).to.equal(recipient1.address);
        expect(owner2).to.equal(recipient2.address);
        expect(owner3).to.equal(recipient3.address);
    });
});

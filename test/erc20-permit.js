const {expect} = require('chai');
const {ethers} = require('hardhat');

//uniswap v3
async function getPermitSignature(signer, token, spender, value, deadline) {
    const [nonce, name, version, chainId] = await Promise.all([token.nonces(signer.address), token.name(), '1', signer.getChainId()]);
    console.log('nonce:', nonce.toString(), 'name:', name, 'version:', version, 'signer:', signer);
    return ethers.utils.splitSignature(
        await signer._signTypedData(
            {
                name,
                version,
                chainId,
                verifyingContract: token.address,
            },
            {
                Permit: [
                    {
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        name: 'spender',
                        type: 'address',
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                    },
                    {
                        name: 'nonce',
                        type: 'uint256',
                    },
                    {
                        name: 'deadline',
                        type: 'uint256',
                    },
                ],
            },
            {
                owner: signer.address,
                spender,
                value,
                nonce,
                deadline,
            }
        )
    );
}

describe('ERC20Permit', function () {
    const deadline = ethers.constants.MaxUint256;
    const amount = 10;
    it('should permit', async function () {
        // [signer, ...users] = await ethers.getSigners();
        const accounts = await ethers.getSigners(1);
        const signer = accounts[0];

        const Token = await ethers.getContractFactory('Token');
        const token = await Token.deploy();
        await token.deployed();

        const Vault = await ethers.getContractFactory('Vault');
        const vault = await Vault.deploy(token.address);
        await vault.deployed();

        await token.mint(signer.address, amount);
        expect(await token.balanceOf(signer.address)).to.equal(amount);

        const {v, r, s} = await getPermitSignature(signer, token, vault.address, amount, deadline);

        await vault.depositWithPermit(amount, deadline, v, r, s);
        expect(await token.balanceOf(vault.address)).to.equal(amount);
    });
});

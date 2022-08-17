require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ganache');
require('@nomiclabs/hardhat-etherscan');

//elivia
const PRIVATE_KEY = 'b5b0c8aba0dd8c1afd7904acc1c8330be10827af8187912db8faad171db0bd90';
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: '0.8.4',
    networks: {
        // hardhat: {
        //     chainId: 1337,
        // },
        // localhost: {
        //     url: 'http://localhost:8545',
        // },
        // ropsten: {
        //   url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
        //   accounts: [`${ROPSTEN_PRIVATE_KEY}`],
        // },
        rinkeby: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/ybf2jkl9Ygkx1sT9ohR8msSitZeMXyzd`,
            accounts: [PRIVATE_KEY],
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/vTxuzg6GwRxcJnAtv-hdc3cvmpwSMKNk`,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            mainnet: 'YOUR_ETHERSCAN_API_KEY',
            ropsten: 'YOUR_ETHERSCAN_API_KEY',

            polygon: 'TMBXTZNCN21DGHCCQG9SS1Y1Q43TP3JKDV',
            polygonMumbai: 'TMBXTZNCN21DGHCCQG9SS1Y1Q43TP3JKDV',
        },
    },
};

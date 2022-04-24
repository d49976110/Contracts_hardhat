require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ganache');
require('@nomiclabs/hardhat-etherscan');

//elivia
const PRIVATE_KEY = '30931a17ab51731db9e4be92990c1a68978c376e5860853c890263eaeb8c9cfc';
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
        // localhost: {
        //   url: 'http://localhost:8545',
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

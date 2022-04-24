const hre = require('hardhat');

async function main() {
    const Zeta = await hre.ethers.getContractFactory('Zeta');
    const zeta = await Zeta.deploy();

    await zeta.deployed();

    console.log('zeta deployed to:', zeta.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

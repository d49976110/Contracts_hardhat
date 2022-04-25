const hre = require('hardhat');

async function main() {
    const Create2Factory = await hre.ethers.getContractFactory('Create2Factory');
    const create2Factory = await Create2Factory.deploy();

    await create2Factory.deployed();

    console.log('zeta deployed to:', create2Factory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const hre = require('hardhat');

async function main() {
    const Gas = await hre.ethers.getContractFactory('Gas');
    const gas = await Gas.deploy();

    await gas.deployed();

    console.log('gas deployed to:', gas.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

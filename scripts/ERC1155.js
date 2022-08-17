const hre = require('hardhat');

async function main() {
    const test1155 = await hre.ethers.getContractFactory('test1155');
    const ERC1155 = await test1155.deploy('https://google.com/');

    await ERC1155.deployed();

    console.log('ERC1155 deployed to:', ERC1155.address);

    await ERC1155.mint();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

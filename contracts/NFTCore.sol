// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import './token/ERC1155.sol';

// import './token/IERC1155MetadataURI.sol';

contract NFTCore is ERC1155 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) public override {
        require(from == msg.sender || isApprovedForAll(from, msg.sender), 'ERC1155: caller is not owner nor approved');
        _safeTransferFrom(from, to, tokenId, amount, data);
    }

    /// @dev transfer NFTs from A to B
    /// @param from owner address
    /// @param to to address
    /// @param tokenIds tokenIds
    /// @param amounts amount of each transfer NFT
    /// @param data using "0x"
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory tokenIds,
        uint256[] memory amounts,
        bytes memory data
    ) public override {
        require(from == msg.sender || isApprovedForAll(from, msg.sender), 'ERC1155: transfer caller is not owner nor approved');
        _safeBatchTransferFrom(from, to, tokenIds, amounts, data);
    }
}

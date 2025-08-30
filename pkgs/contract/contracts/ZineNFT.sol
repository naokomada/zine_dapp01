// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZineNFT is ERC721, Ownable {
    address public minter;
    uint256 private _nextTokenId;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {}

    function setMinter(address _minter) public onlyOwner {
        minter = _minter;
    }

    function mint(address to) public returns (uint256) {
        require(msg.sender == minter, "ZineNFT: caller is not the minter");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }
}

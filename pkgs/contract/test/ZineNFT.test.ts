import { expect } from "chai";
import { ethers } from "hardhat";
import { ZineNFT } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("ZineNFT", function () {
  let zineNFT: ZineNFT;
  let owner: HardhatEthersSigner;
  let minter: HardhatEthersSigner;
  let user: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, minter, user] = await ethers.getSigners();
    const ZineNFTFactory = await ethers.getContractFactory("ZineNFT");
    zineNFT = await ZineNFTFactory.deploy("Zine NFT", "ZINE");
    await zineNFT.waitForDeployment();
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await zineNFT.name()).to.equal("Zine NFT");
    expect(await zineNFT.symbol()).to.equal("ZINE");
  });

  describe("Minter Management", function () {
    it("Should allow the owner to set the minter", async function () {
      await zineNFT.connect(owner).setMinter(minter.address);
      expect(await zineNFT.minter()).to.equal(minter.address);
    });

    it("Should prevent non-owners from setting the minter", async function () {
      await expect(
        zineNFT.connect(user).setMinter(minter.address)
      ).to.be.revertedWithCustomError(zineNFT, "OwnableUnauthorizedAccount").withArgs(user.address);
    });
  });

  describe("Minting", function () {
    beforeEach(async function () {
      await zineNFT.connect(owner).setMinter(minter.address);
    });

    it("Should allow the minter to mint a new NFT", async function () {
      await expect(zineNFT.connect(minter).mint(user.address))
        .to.emit(zineNFT, "Transfer")
        .withArgs(ethers.ZeroAddress, user.address, 0);
      expect(await zineNFT.ownerOf(0)).to.equal(user.address);
      expect(await zineNFT.balanceOf(user.address)).to.equal(1);
    });

    it("Should prevent non-minters from minting", async function () {
      await expect(
        zineNFT.connect(user).mint(user.address)
      ).to.be.revertedWith("ZineNFT: caller is not the minter");
    });

    it("Should prevent the owner from minting if not set as minter", async function () {
        await expect(
          zineNFT.connect(owner).mint(user.address)
        ).to.be.revertedWith("ZineNFT: caller is not the minter");
    });

    it("Should increment token IDs", async function () {
        await zineNFT.connect(minter).mint(user.address);
        await zineNFT.connect(minter).mint(owner.address);
        expect(await zineNFT.ownerOf(0)).to.equal(user.address);
        expect(await zineNFT.ownerOf(1)).to.equal(owner.address);
    });
  });
});

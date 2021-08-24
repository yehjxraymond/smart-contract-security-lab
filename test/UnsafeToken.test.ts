import { ethers } from "hardhat";
import { expect } from "chai";
import { constants } from "ethers";

describe("UnsafeToken", function () {
  it("should be possible to get more than 1000 tokens", async () => {
    // Complete this challenge by having the deployer hold 100,000 tokens
    const [deployer, target] = await ethers.getSigners();

    // Deploy the contract
    const UnsafeToken = await ethers.getContractFactory("UnsafeToken");
    const unsafeToken = await UnsafeToken.deploy();
    await unsafeToken.deployed();

    // Exploit start

    
    // Exploit end

    // Completion condition
    expect(await unsafeToken.balanceOf(deployer.address)).to.equal(100000);
  });
});

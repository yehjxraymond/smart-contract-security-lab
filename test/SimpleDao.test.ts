import { ethers } from "hardhat";
import { expect } from "chai";
import { constants } from "ethers";

describe("SimpleDao", function () {
  it("should be possible to withdraw more ethers than deposited", async () => {
    // Complete this challenge by allowing the attacker balance to be greater than 5 ETH
    // You may only send transactions from the attacker

    // Attacker starts with 1 ETH
    const [deployer, victim1, victim2] = await ethers.getSigners();
    const provider = deployer.provider;
    if (!provider) throw new Error("Unable to get provider");
    const attacker = ethers.Wallet.createRandom().connect(provider);
    await deployer.sendTransaction({
      to: attacker.address,
      value: constants.WeiPerEther,
    });

    // Deploy the contract
    const SimpleDao = await ethers.getContractFactory("SimpleDao");
    const simpleDao = await SimpleDao.deploy();
    await simpleDao.deployed();

    // 2 victims deposit total of 10 ETH into the DAO
    await simpleDao
      .connect(victim1)
      .depositFunds({ value: constants.WeiPerEther.mul(5) });
    await simpleDao
      .connect(victim2)
      .depositFunds({ value: constants.WeiPerEther.mul(5) });

    // Exploit start

    // Exploit end

    // Completion condition
    expect(await provider.getBalance(attacker.address)).to.be.gt(
      constants.WeiPerEther.mul(5)
    );
  });
});

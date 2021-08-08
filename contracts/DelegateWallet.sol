//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract DelegateWallet {
    address public owner;
    address public walletLib;

    constructor(address lib) {
        owner = msg.sender;
        walletLib = lib;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function deposit() public payable {}

    function withdraw(uint256 _weiToWithdraw) public onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: _weiToWithdraw}("");
        require(success);
    }

    fallback() external {
        (bool success, ) = walletLib.delegatecall(msg.data);
        require(success);
    }
}

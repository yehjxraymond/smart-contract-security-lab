//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract WalletLib {
    uint256 public minBalance;
    uint256 public maxBalance;

    function setMinBalance(uint256 _bal) public {
        minBalance = _bal;
    }

    function setMaxBalance(uint256 _bal) public {
        maxBalance = _bal;
    }

    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function sub(uint256 a, uint256 b) public pure returns (uint256) {
        return a - b;
    }
}

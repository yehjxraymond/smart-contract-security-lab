//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract UnsafeToken {
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = 1000;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public {
        balances[msg.sender] -= _value;
        balances[_to] += _value;
    }
}

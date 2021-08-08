//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract SimpleDao {
    mapping(address => uint256) public balances;

    function depositFunds() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawFunds(uint256 _weiToWithdraw) public {
        require(balances[msg.sender] >= _weiToWithdraw);
        payable(msg.sender).call{value: _weiToWithdraw}("");
        balances[msg.sender] -= _weiToWithdraw;
    }
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "../UnsafeToken.sol";

contract UnsafeTokenEchidna is UnsafeToken {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}

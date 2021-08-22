//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

// Credits to https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol
contract Magic {
    bool value_found = false;

    function magic(
        uint256 magic_1,
        uint256 magic_2,
        uint256 magic_3,
        uint256 magic_4
    ) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public returns (bool) {
        return !value_found;
    }
}

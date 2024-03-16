// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "solady/Ownable.sol";

contract UsernameRegistry is Ownable {
    mapping(address => bytes32) public addressToUsername;

    function setUsername(address _scw, string memory _un) external onlyOwner {
        addressToUsername[_scw] = bytes32(_un);
    }
}

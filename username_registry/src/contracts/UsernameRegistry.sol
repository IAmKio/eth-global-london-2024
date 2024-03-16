// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "solady/auth/Ownable.sol";
import "../interfaces/IUsernameRegistry.sol";

contract UsernameRegistry is Ownable, IUsernameRegistry {
    mapping(address => string) public addressToUsername;
    mapping(string => address) public usernameToAddress;

    constructor(address _owner) {
        _setOwner(_owner);
    }

    // External functions

    function registerUserData(
        address _scw,
        string memory _un
    ) external onlyOwner {
        _setSCW(_scw, _un);
        _setUsername(_scw, _un);
        emit UserRegistered(_scw, _un);
    }

    function getUsernameForWallet(
        address _scw
    ) external view returns (string memory un) {
        return addressToUsername[_scw];
    }

    function getWalletForUsername(
        string memory _un
    ) external view returns (address scw) {
        return usernameToAddress[_un];
    }

    // Internal functions

    function _setSCW(address _scw, string memory _un) internal {
        usernameToAddress[_un] = _scw;
    }
    function _setUsername(address _scw, string memory _un) internal {
        addressToUsername[_scw] = _un;
    }
}

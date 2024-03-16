// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

interface IUsernameRegistry {
    event UserRegistered(address indexed scw, string un);

    function registerUserData(address _scw, string memory _un) external;

    function getUsernameForWallet(
        address _scw
    ) external view returns (string memory un);

    function getWalletForUsername(
        string memory _un
    ) external view returns (address scw);
}

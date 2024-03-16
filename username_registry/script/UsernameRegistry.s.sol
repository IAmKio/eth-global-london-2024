// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {UsernameRegistry} from "../src/contracts/UsernameRegistry.sol";

contract UsernameRegistryScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        UsernameRegistry unreg = new UsernameRegistry(msg.sender);
        console2.log("UsernameRegistry deployed at address", address(unreg));
        vm.stopBroadcast();
    }
}

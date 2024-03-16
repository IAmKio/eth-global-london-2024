// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import {UsernameRegistry} from "../src/contracts/UsernameRegistry.sol";

contract UsernameRegistryTest is Test {
    UsernameRegistry registry;
    Account internal owner;
    Account internal user;

    event UserRegistered(address indexed scw, string un);

    function setUp() public {
        owner = makeAccount("owner");
        user = makeAccount("user");
        registry = new UsernameRegistry(owner.addr);
    }

    function test_registerUserData() public {
        string memory username = "john";
        vm.prank(owner.addr);

        registry.registerUserData(user.addr, username);

        assertEq(registry.getUsernameForWallet(user.addr), username);
        assertEq(registry.getWalletForUsername(username), user.addr);
    }

    function test_revertOnlyOwnerCanRegister() public {
        string memory username = "john";
        vm.prank(user.addr);
        vm.expectRevert();
        registry.registerUserData(user.addr, username);
    }

    // Test getUsernameForWallet
    function test_getUsernameForWallet() public {
        string memory username = "john";
        vm.prank(owner.addr);

        registry.registerUserData(user.addr, username);

        string memory result = registry.getUsernameForWallet(user.addr);
        assertEq(result, username);
    }

    // Test getWalletForUsername
    function test_getWalletForUsername() public {
        string memory username = "john";
        vm.prank(owner.addr);

        registry.registerUserData(user.addr, username);

        address result = registry.getWalletForUsername(username);
        assertEq(result, user.addr);
    }

    // Test UserRegistered event
    function test_emitUserRegisteredEvent() public {
        string memory username = "john";
        vm.expectEmit(true, true, false, true);
        emit UserRegistered(user.addr, username);
        vm.prank(owner.addr);

        registry.registerUserData(user.addr, username);
    }
}

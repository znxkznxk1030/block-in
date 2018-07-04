/// This is made for hdac Hackerton in 2018.
/// Made by Team Block In
/// Ver 1.6
pragma solidity ^0.4.0;

import "./permission.sol";

contract hdac is Permission {
    function constuctor() public {
        numHomes = 0;
        balance = 0;
        contractOwner = msg.sender;
    }
}

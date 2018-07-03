pragma solidity ^0.4.0;

import "./home.sol";
import "./customer.sol";
import "./device.sol";
import "./safemath.sol";

contract Permission is home, customer, device {
    using SafeMath for uint;
    function () payable public {
        customers[msg.sender] = Customer(msg.sender, msg.value, 0,false);
        balance = balance.add(msg.value);
    }

    function giveAdmin(uint _homeIndex, address _to) public {
        if(homes[_homeIndex].homeOwner != msg.sender)
        {
            return;
        }
        homes[_homeIndex].homeNet.admin = _to;
        homes[_homeIndex].homeNet.permittedUser.push(_to);
        homes[_homeIndex].homeNet.numPermittedUser++;
    }

    function delegatePermission(uint _homeIndex, address _to) public {
        if(homes[_homeIndex].homeNet.admin != msg.sender && homes[_homeIndex].homeOwner != msg.sender)
        {
            return;
        }
        homes[_homeIndex].homeNet.permittedUser.push(_to);
        homes[_homeIndex].homeNet.numPermittedUser++;
    }

    function checkin(uint _homeIndex, address _to) public {
        require(homes[_homeIndex].homeOwner == msg.sender);
        if(homes[_homeIndex].isOnMarket == false)
        {
            return;
        }
        if(customers[_to].deposit < homes[_homeIndex].deposit.mul(1 ether))
        {
            return;
        }
        delegatePermission(_homeIndex, _to);
        homes[_homeIndex].isOnMarket = false;
        homes[_homeIndex].checkinTime = now;
        customers[_to].isCheckedin = true;
    }

    function checkout(uint _homeIndex, address _customerAddress) payable public {
        if(homes[_homeIndex].homeOwner != msg.sender)
        {
            return;
        }
        homes[_homeIndex].checkoutTime = now;
        homes[_homeIndex].usageTime = homes[_homeIndex].checkoutTime.sub(homes[_homeIndex].checkinTime);
        for(uint i = 0; i < homes[_homeIndex].homeNet.numDevice; i++)
        {
            uint usageTime = devices[homes[_homeIndex].homeNet.permittedDevice[i]].usageTime;
            uint fee = devices[homes[_homeIndex].homeNet.permittedDevice[i]].fee;
            customers[_customerAddress].totalPrice = customers[_customerAddress].totalPrice.add(usageTime.mul(fee));
        }
        customers[_customerAddress].totalPrice = customers[_customerAddress].totalPrice.add(homes[_homeIndex].usageTime.mul(homes[_homeIndex].price));
        doPay(_customerAddress, _homeIndex);
        initialize(_homeIndex);
        initializeDevices(_homeIndex);
        customers[_customerAddress].isCheckedin = false;
    }

    function doPay(address _customerAddress, uint _HomeIndex) payable public {
        require(customers[_customerAddress].totalPrice <= customers[_customerAddress].deposit);
        require(customers[_customerAddress].deposit <= balance);
        homes[_HomeIndex].homeOwner.transfer(customers[_customerAddress].totalPrice);
        if((customers[_customerAddress].deposit.sub(customers[_customerAddress].totalPrice)) > balance)
        {
            return;
        }
        _customerAddress.transfer(customers[_customerAddress].deposit.sub(customers[_customerAddress].totalPrice));
        balance = balance.sub(customers[_customerAddress].deposit);
        customers[_customerAddress].deposit = 0;
    }

    function refund(address _customerAddress) payable public {
        require(msg.sender == _customerAddress);
        require(customers[_customerAddress].isCheckedin == false);
        require(customers[_customerAddress].deposit < balance);
        _customerAddress.transfer(customers[_customerAddress].deposit);
    }
}

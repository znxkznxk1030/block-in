pragma solidity ^0.4.0;

contract customer {
    struct Customer {
        address customerAddress;
        uint deposit;
        uint totalPrice;
        bool isCheckedin;
    }

    mapping(address => Customer) customers;

    function getCustomer(address _customerAddress) public constant returns (
        uint _deposit,
        uint _totalPrice,
        bool _isCheckedin)
    {
        _deposit = customers[_customerAddress].deposit;
        _totalPrice = customers[_customerAddress].totalPrice;
        _isCheckedin = customers[_customerAddress].isCheckedin;
    }
}

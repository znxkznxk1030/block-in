# Block In
## testRPC
### before run this project, make sure running testrpc on background 
URL : localhost:8545
- install via npm (Make sure you habve Node.js)

``` shell
npm install -g ethereumjs-testrpc
```
- execute via terminal
``` shell
$ testrpc #execute default
$ testrpc -l 1000 #execute with setting gaslimit
```

## Run this Project
- install dependencies
``` shell
npm i
```

- run
``` shell
npm start
```

URL : http://localhost:1356

### 솔리디티 정의된 인터페이스 보기
``` shell
http://localhost:3000/block-in/api/interface
```

``` json
{
"methods": [
"Balance",
"0x0ef67887",
"Balance()",
"DeviceOn",
"0x1a8358f9",
"DeviceOn(uint256,address)",
"GetHome",
"0x24091990",
"GetHome(uint256)",
"DoPay",
"0x29dc7355",
"DoPay(address,uint256)",
"GetIoTnet",
"0x3062d131",
"GetIoTnet(uint256)",
"OnSale",
"0x3de5a0d8",
"OnSale(uint256,uint256)",
"GetMinute",
"0x427aaa8b",
"GetMinute(uint256)",
"Constuctor",
"0x4a0bc640",
"Constuctor()",
"GiveAdmin",
"0x5fa660e6",
"GiveAdmin(uint256,address)",
"AddDevice",
"0x693cea2e",
"AddDevice(uint256,address,string,string,uint256)",
"GetDevice",
"0x7f1c129a",
"GetDevice(address)",
"GetCustomer",
"0x87d30278",
"GetCustomer(address)",
"RegistHome",
"0xbd532723",
"RegistHome(address)",
"GetHour",
"0xbfb80817",
"GetHour(uint256)",
"Initialize",
"0xc43e48cf",
"Initialize(uint256)",
"Checkout",
"0xc7283831",
"Checkout(uint256,address)",
"numHomes",
"0xea6564f7",
"numHomes()",
"Checkin",
"0xecebf80c",
"Checkin(uint256,address)",
"DeviceOff",
"0xf5f27b15",
"DeviceOff(uint256,address)",
"DelegatePermission",
"0xf8df92d9",
"DelegatePermission(uint256,address)"
],
"code": 200
}
```
### 솔리디티 바로테스트 하기
``` shell
# HTTP Method: POST 

http://localhost:3000/block-in/api/interface/call
http://localhost:3000/block-in/api/interface/send
```

- example request body
``` json
{
    "name" : "hdac",
    "method": "GetMinute",
/*  send 의 경우   */ 
/*  "gas": 1000, */
/*       추가     */
    "from": "0x98bcD3D00454BEeCAf45Cc204F68962F7C153Cfd",
    "param": [
        23456789    // 주의:  method에 따라 순서 잘 맞추어서 넣어야함!!
    ]
}
```
- response 
``` json
//success
{
    "ret": "390946", // ret 에 solidity에서 call하고 나온값 반환
    "code": 200
}
```




### example api
```
http://localhost:3000/block-in/api/contract/block-in?name=RSPBattle
```

- request query (GET method)
    - name : {contract name}

- response (JSON)
    - code: {response code}
    - address: {contract address},
    - abi: {compiled contract abi}
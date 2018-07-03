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
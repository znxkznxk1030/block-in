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

URL : http://localhost:3000

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
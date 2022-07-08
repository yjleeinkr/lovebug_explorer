# lovebug_explorer

- geth 실행

```shell
geth --networkid 1004 --ws --ws.port 7979 --ws.origins "*" --ws.api "eth,admin,miner,txpool,web3,personal,net" --ws.addr "0.0.0.0" --allow-insecure-unlock --datadir ./node
```

- js 콘솔창 -geth 와 연결

```shell
geth attach ws://127.0.0.1:7979
```

- 트랜잭션 보낼때

```shell
personal.sendTransaction({from:eth.coinbase, to:'0xadee049156fc0f67a93b7f8105a0d87dd1498a6a', value: web3.toWei(1,'ether')},'1234')
```

```shell
personal.sendTransaction({from:eth.coinbase, to:"0x2b5fa79ad1dc7e49a7c2f310a3edcfd6981726f9", value: web3.toWei(1,'ether')},'1004')
```

```shell
personal.sendTransaction({from:eth.coinbase, to:"0x8eb54442b18569a0bbb1e404ab7aa362fb763b24", value: web3.toWei(1,'ether')},'1004')
```

```shell
personal.sendTransaction({from:"0x2b5fa79ad1dc7e49a7c2f310a3edcfd6981726f9", to:"0x8eb54442b18569a0bbb1e404ab7aa362fb763b24", value: web3.toWei(1,'ether')},'1004')
```

```shell
personal.sendTransaction({from:"0x8eb54442b18569a0bbb1e404ab7aa362fb763b24", to:"0x2b5fa79ad1dc7e49a7c2f310a3edcfd6981726f9", value: web3.toWei(2,'ether')},'1004')
```

```shell
personal.sendTransaction({from:'0xadee049156fc0f67a93b7f8105a0d87dd1498a6a', to:eth.coinbase, value: web3.toWei(1,'ether')},'1004')
```

- 블럭 개수 확인

```shell
eth.blockNumber
```

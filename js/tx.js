import { decodeParameter } from "web3-eth-abi"

const fnMem = new Map()
const storage = chrome.storage.local

async function getFnName(fn) {

  if(fn=="0x") return "Transfer"

  if (fnMem.has(fn)) return fnMem.get(fn)

  const rep = await fetch("https://otter-pulsechain.g4mm4.io/signatures/" + fn.slice(2))
  if (rep.ok) {
    const body = await rep.text()
    fnMem.set(fn, body.split("(")[0])
  }
  else {
    fnMem.set(fn, "contract call")
  }
  return fnMem.get(fn);
}

export async function storeTx(_wallet_, tx, rctp, timestamp, host) {

    const data = await storage.get(_wallet_)

    console.log(data)

    if(!data[_wallet_]) {
        data[_wallet_] = {}
    }

    const fn = tx.input.slice(0, 10);

    data[_wallet_][tx.hash] = {
      chainId: tx.chainId,
      dapp: host,
      fn: await getFnName(fn),
      timestamp: parseInt(timestamp),
      nonce: parseInt(tx.nonce),
      failed: rctp.status!="0x1",
      infos:[]
    }

    if (tx.value && tx.value != "0x0") {
        data[_wallet_][tx.hash].infos.push({
            type: "gave",
            amount: parseInt(tx.value),
            token: "0x0000000000000000000000000000000000000000"
        })
    }

    if(rctp.logs) {
        for(const log of rctp.logs) {

            //transfer
            if(log.topics[0]=="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") {
                const from = decodeParameter("address", log.topics[1])
                const to = decodeParameter("address", log.topics[2])
                const amount = decodeParameter("uint256", log.data)
                const token = log.address

                //console.log(from,to,amount,token)

                if(from==_wallet_ || to==_wallet_) {

                data[_wallet_][tx.hash].infos.push(
                    {
                    type: from==_wallet_ ? 'gave' : 'got', 
                    token,
                    amount
                    })
                }
            }

            //withdraw
            if(log.topics[0] == "0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65") {
                const amount = decodeParameter("uint256", log.data)
                data[_wallet_][tx.hash].infos.push({
                    type: "got",
                    amount,
                    token: "0x0000000000000000000000000000000000000000"
                })
            }
            
        }
    }

    await storage.set(data)

}



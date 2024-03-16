export default function fetchAccountBalance(address) {
  return fetch(
    `https://api-sepolia.basescan.org/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.REACT_APP_BASESCAN_KEY}`
  )
    .then((res) => res.json())
    .then((data) => data.result);
}

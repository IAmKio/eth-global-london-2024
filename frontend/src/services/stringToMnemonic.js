import { SHA256 } from "crypto-js";
import * as ethers from "ethers";

export default function stringToMnemonic(str) {
  const hash = SHA256(str).toString();
  let utf8Encode = new TextEncoder();
  const hashUInt8Array = utf8Encode.encode(hash);
  const mnemonicString = ethers.utils.entropyToMnemonic(
    hashUInt8Array.slice(0, 32)
  );

  return mnemonicString;
}

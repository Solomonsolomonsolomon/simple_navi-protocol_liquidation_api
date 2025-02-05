
import { NAVISDKClient } from "navi-sdk";
import {NAVX, Sui, wUSDC, USDT, vSui, haSui, WETH, CETUS} from 'navi-sdk/dist/address';
import  dotenv from "dotenv";
dotenv.config();

const client = new NAVISDKClient({
    mnemonic: process.env.mnemonic || "",
    networkType: "mainnet", 
    numberOfAccounts: 5
  }); 


  export default client;
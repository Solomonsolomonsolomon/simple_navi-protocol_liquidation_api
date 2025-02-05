import client from "./config/config";
import dotenv from 'dotenv';
import { createServer } from 'http';
dotenv.config();
const account = client.accounts[0];
console.log("Account address:", account.address);
import utils from "./helpers/utils";


const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  

  const userCheckMatch = req.url?.match(/^\/check-liquidations\/([^\/]+)/);
  
  if (req.url === '/liquidations' && req.method === 'GET') {
    try {
      const sentioLiquidations = await utils.fetchLiquidationsFromSentio();
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        data: sentioLiquidations
      }));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({
        success: false,
        message: 'Error fetching liquidations'
      }));
    }
  } else if (userCheckMatch && req.method === 'GET') {
    try {
      const address = userCheckMatch[1];
      const liquidationInfo = await utils.checkUserLiquidations(address);
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        wasLiquidated: liquidationInfo.asUser.length > 0,
        isLiquidator: liquidationInfo.asLiquidator.length > 0,
        address,
        //...liquidationInfo,
        summary: {
          liquidatedAsUser: liquidationInfo.asUser.length > 0,
          actedAsLiquidator: liquidationInfo.asLiquidator.length > 0
        }
      }));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({
        success: false,
        message: 'Error checking liquidations for address'
      }));
    }
  } else if (req.url === '/account' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: account
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({
      success: false,
      message: 'Route not found'
    }));
  }
});

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



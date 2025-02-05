import sentioApi from "../config/api";

class Utils{

    async  fetchLiquidationsFromSentio() {
        try {
          const response = await sentioApi.post('/sql/execute', {
            sqlQuery: {
              sql: "select * from Liquidation"
            }
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching liquidations from Sentio:', error);
          return [];
        }
      }
      
      
      async  checkUserLiquidations(address: string) {
        try {
          const response = await sentioApi.post('/sql/execute', {
            sqlQuery: {
              sql: `SELECT * FROM Liquidation WHERE user = '${address}' OR liquidation_sender = '${address}'`
            }
          });
      
          const liquidations = response.data;
          console.log(liquidations.result.rows,'liquidations')
          return {
            asUser: liquidations.result.rows.filter((l: any) => l.user === address),
            asLiquidator: liquidations.result.rows.filter((l: any) => l.liquidation_sender === address),
            totalLiquidations: liquidations.length
          };
        } catch (error) {
          console.error('Error checking user liquidations:', error);
          return {
            asUser: [],
            asLiquidator: [],
            totalLiquidations: 0
          };
        }
      }
      


}

const utils=new Utils();
export default Object.freeze(utils);
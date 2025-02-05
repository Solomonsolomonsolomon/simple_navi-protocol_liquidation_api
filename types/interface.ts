interface LiquidationRecord {
    timestamp: string;
    collateral_amount: string;
    collateral_asset: string;
    debt_amount: string;
    debt_asset: string;
    user: string;
    address: string;
    transaction_hash: string;
  }



  export type {LiquidationRecord}
import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../..';

interface Option {
  lcd: LCDClient;
  contractAddr: string;
  amount: string;
  pair_contract_address: string;
}
interface SimulationResponse {
  return_amount: string;
  spread_amount: string;
  commission_amount: string;
}

export const queryTerraswapReverseTokenSimulation = ({
  lcd,
  contractAddr,
  amount,
  pair_contract_address,
}: // eslint-disable-next-line @typescript-eslint/no-unused-vars
Option) => async (_: AddressProvider): Promise<SimulationResponse> => {
  const response: SimulationResponse = await lcd.wasm.contractQuery(
    pair_contract_address,
    {
      reverse_simulation: {
        ask_asset: {
          info: {
            ANC: {
              contract_addr: contractAddr,
            },
          },
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      },
    },
  );
  return response;
};

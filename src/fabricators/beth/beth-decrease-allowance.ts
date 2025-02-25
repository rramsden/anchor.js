import { AddressProvider } from '../../address-provider/provider';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';

/* eslint-disable */
type Expire = { at_height: number } | { at_time: number } | { never: {} };

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param amount of allowance.
 * @param spends Client's Terra address (address of spender).
 * @param expire, at specific height e.g. {"at_height": 3_500_000}, at specific time {"at_time": 1624421015 }, or never
 */

interface Option {
  address: string;
  amount: string;
  spender: string;
  expires?: Expire;
}

export const fabricatebEthDecreaseAllowance = ({
  address,
  amount,
  spender,
  expires,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(amount),
    validateIsGreaterThanZero(amount),
    validateAddress(spender),
  ]);

  const bEthTokenAddress = addressProvider.bEthToken();

  return [
    new MsgExecuteContract(address, bEthTokenAddress, {
      decrease_allowance: {
        spender: spender,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
        expires: expires,
      },
    }),
  ];
};

import fs from 'fs'
import * as envfile from 'envfile';

export const getAddressesForNetwork = (networkName: string) => {
  const path = `utils/addresses/addresses-${networkName}.json`;
  return JSON.parse(fs.readFileSync(path).toString());
};

export const getEnvForNetwork = (networkName: string) => {
  const path = `./env/.env.${networkName}`;
  return envfile.parse(fs.readFileSync(path).toString());
};
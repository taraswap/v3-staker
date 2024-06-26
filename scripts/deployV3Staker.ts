import { ethers, network } from 'hardhat';
import { getAddressesForNetwork, getEnvForNetwork } from '../utils/DeploymentUtils'
import { ContractsNames } from '../utils/ContractsNames'

async function deployV3Staker() {
  const addresses = getAddressesForNetwork(network.name);
  const env = getEnvForNetwork(network.name);

  const factoryAddress = addresses[ContractsNames.FACTORY];
  const nonfungiblePositionManagerAddress = addresses[ContractsNames.NONFUNGIBLE_POSITION_MANAGER];

  const V3Staker = await ethers.getContractFactory(ContractsNames.V3_STAKER);
  const v3Staker = await V3Staker.deploy(
    factoryAddress,
    nonfungiblePositionManagerAddress,
    env.MAX_INCENTIVE_START_LEAD_TIME,
    env.MAX_INCENTIVE_DURATION,
  );
  await v3Staker.deployed();

  console.log(`V3 staker deployed to ${v3Staker.address}`);
}

deployV3Staker().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import config from './config';
import IPFS from 'ipfs';

const ipfs = new IPFS(config.ipfs);

export default ipfs;
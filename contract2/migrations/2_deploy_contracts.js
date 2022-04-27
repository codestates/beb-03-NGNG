const NgngToken = artifacts.require("NgngToken");
const NgngNft = artifacts.require('NgngNft');
module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(NgngToken);
    await deployer.deploy(NgngNft);
};

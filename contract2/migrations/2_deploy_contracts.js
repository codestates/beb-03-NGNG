const NgngToken = artifacts.require("NgngToken");
const NgngNft = artifacts.require('NgngNft');
module.exports = async function (deployer) {
    await deployer.deploy(NgngToken);
    await deployer.deploy(NgngNft);
};

// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// let contractAdress = 0xb3583671780ecf1b6E2189c8cfcf708f7780e554

contract NgngToken is ERC20, Ownable {
    constructor() ERC20("NGNG Token", "NGT") {      
    }
    function mintToken(address to, uint256 amount) public onlyOwner returns (bool){
        require(to != address(0x0));
        require(amount > 0);
        uint256 easyNum = amount;
        _mint(to, easyNum);
        _approve(to, msg.sender, allowance(to, msg.sender) + easyNum);  // 토큰받는사람이, 서버에게, 허락된 토큰 개수 + amount

        return true;
    }
    function transferFrom( // NFT 용 transfer
        address from,
        address to,
        uint256 amount

        ) public override returns (bool) {
            uint256 easyNum = amount*(10**18);
            _spendAllowance(from, to, easyNum);
            _transfer(from, to, easyNum);
            return true;
        }
    function p2pTransferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        uint256 easyNum = amount*(10**18);
        _spendAllowance(from, msg.sender, easyNum); // from 이 돈 빠져나가는 지갑, 권한이 필요한 애(누구권한?서버)
        _transfer(from, to, easyNum);
        _approve(to, msg.sender, allowance(to, msg.sender) + easyNum);
        return true;
    } 
}
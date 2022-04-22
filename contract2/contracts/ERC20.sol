// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NgngToken is ERC20, Ownable {
    constructor() ERC20("NGNG Token", "NGT") {      
    }
    function mintToken(address to, uint256 amount) public onlyOwner returns (bool){
        require(to != address(0x0));
        require(amount > 0);
        uint256 easyNum = amount*(10**18);
        _mint(to, easyNum);
        _approve(to, msg.sender, allowance(to, msg.sender) + easyNum);  // 토큰받는사람이, 서버에게, 허락된 토큰 개수 + amount

        return true;
    }
    function transferFrom(
        address from,
        address to,
        uint256 amount
        ) public override returns (bool) {
            _spendAllowance(from, to, amount);
            _transfer(from, to, amount);
            return true;
        }
}
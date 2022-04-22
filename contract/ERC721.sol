// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract NgngNft is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 public nftPrice;

    constructor() ERC721("NgngNFT", "NGNG") {
        nftPrice = 10e18;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        require(token.balanceOf(recipient) > nftPrice);
        token.transferFrom(recipient, msg.sender, nftPrice); // from to amount , nft사니까 돈뺌, 돈 받는사람, 가격만큼

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current(); // uint256으로 바꿔주려면 .current()를 써줘서 토큰id받아옴
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    function setToken (address tokenAddress) public onlyOwner returns (bool) { // tokenAddress가 토큰 컨트랙트 주소임
        require(tokenAddress != address(0x0)); 
        token = IERC20(tokenAddress); // 거래되는 토큰을 바꾸고 싶을때, 컨트랙트 수정할 수 없으니까 함수로 뺴놓은거
        return true;
    } // 1. setToken으로 사용할 토큰 저장
}
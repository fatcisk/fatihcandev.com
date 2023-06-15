import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd8() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-8-puppet"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #8: Puppet</h2>
            <p>
                There’s a lending pool where users can borrow Damn Valuable
                Tokens (DVTs). To do so, they first need to deposit twice the
                borrow amount in ETH as collateral. The pool currently has
                100000 DVTs in liquidity. There’s a DVT market opened in an old
                Uniswap v1 exchange, currently with 10 ETH and 10 DVT in
                liquidity. Pass the challenge by taking all tokens from the
                lending pool. You start with 25 ETH and 1000 DVTs in balance.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                The lender contract uses the Uniswap DVT/ETH pair as the price
                oracle to calculate required collateral for the amount of tokens
                being borrowed. And we know that we can easily manipulate the
                liquidity pool and so the price. To solve this challenge we are
                going to dumb some amount of DVT tokens into the liquidity pool.
                As the liquidity for this pair is extremely low, the tokens we
                add to the pool will have a significant impact on the price.
                Consequently, we expect to be able to borrow the entire amount
                of DVT tokens from the lender contract while providing only a
                small amount of collateral.
            </p>
            <p>
                PS: The reason why I used{" "}
                <span className="code-h">permit()</span> is that the challenge
                requires us to exploit the contract in a single transaction.
                Therefore, we sign a permit to allow the attacker contract to
                pull DVT tokens from the attackerEOA on its own.
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

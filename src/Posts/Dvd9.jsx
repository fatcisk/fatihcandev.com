import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd9() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-9-puppet-v2"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #9: Puppet V2</h2>
            <p>
                The developers of the previous pool seem to have learned the
                lesson. And released a new version! Now they’re using a Uniswap
                v2 exchange as a price oracle, along with the recommended
                utility libraries. That should be enough. You start with 20 ETH
                and 10000 DVT tokens in balance. The pool has a million DVT
                tokens in balance. You know what to do.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                This challenge is quite similar to{" "}
                <a
                    href="damn-vulnerable-defi-solutions-8-puppet"
                    className="color-span hover:underline"
                >
                    Challenge #8: Puppet
                </a>
            </p>
            <p>
                Using the spot price as the oracle without incorporating the
                TWAP (Time-Weighted Average Price) functionality in Uniswap V2
                can expose the contract to potential exploits, including a
                scenario where tokens are dumped into the liquidity pool which
                is the way we are going to use to exploit this contract.
            </p>
            <p>
                PS: TWAP is a mechanism that calculates the average price of an
                asset over a specific time period. It helps mitigate the impact
                of sudden price fluctuations and provides a more accurate
                representation of the asset's value. By incorporating TWAP, the
                contract can have better protection against price manipulation.
            </p>

            <CodeSnippet codeText={p.snippets[0]} />
        </div>
    );
}

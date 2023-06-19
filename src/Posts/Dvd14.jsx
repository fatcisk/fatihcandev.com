import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd14() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-14-puppet-v3"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #14: Puppet V3</h2>
            <p>
                Even on a bear market, the devs behind the lending pool kept
                building. In the latest version, they’re using Uniswap V3 as an
                oracle. That’s right, no longer using spot prices! This time the
                pool queries the time-weighted average price of the asset, with
                all the recommended libraries. The Uniswap market has 100 WETH
                and 100 DVT in liquidity. The lending pool has a million DVT
                tokens. Starting with 1 ETH and some DVT, pass this challenge by
                taking all tokens from the lending pool. NOTE: unlike others,
                this challenge requires you to set a valid RPC URL in the
                challenge’s test file to fork mainnet state into your local
                environment.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>desc</p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

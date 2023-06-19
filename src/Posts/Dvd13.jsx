import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd13() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-13-wallet-mining"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #13: Wallet Mining</h2>
            <p>
                There’s a contract that incentivizes users to deploy Gnosis Safe
                wallets, rewarding them with 1 DVT. It integrates with an
                upgradeable authorization mechanism. This way it ensures only
                allowed deployers (a.k.a. wards) are paid for specific
                deployments. Mind you, some parts of the system have been highly
                optimized by anon CT gurus.
            </p>
            <p>
                The deployer contract only works with the official Gnosis Safe
                factory at{" "}
                <span className="code-h">
                    0x76E2cFc1F5Fa8F6a5b3fC4c8F4788F0116861F9B
                </span>{" "}
                and corresponding master copy at
                <span className="code-h">
                    0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F
                </span>
                . Not sure how it’s supposed to work though - those contracts
                haven’t been deployed to this chain yet.
            </p>
            <p>
                In the meantime, it seems somebody transferred 20 million DVT
                tokens to{" "}
                <span className="code-h">
                    0x9b6fb606a9f5789444c17768c6dfcf2f83563801
                </span>
                . Which has been assigned to a ward in the authorization
                contract. Strange, because this address is empty as well.
            </p>
            <p>
                Pass the challenge by obtaining all tokens held by the wallet
                deployer contract. Oh, and the 20 million DVT tokens too.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>desc</p>
            <CodeSnippet codeText={p.snippets[0]} />
            <CodeSnippet codeText={p.snippets[1]} />
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[2]} />
        </div>
    );
}

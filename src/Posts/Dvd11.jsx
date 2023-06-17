import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd11() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-11-backdoor"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #11: Backdoor</h2>
            <p>
                To incentivize the creation of more secure wallets in their
                team, someone has deployed a registry of Gnosis Safe wallets.
                When someone in the team deploys and registers a wallet, they
                will earn 10 DVT tokens. To make sure everything is safe and
                sound, the registry tightly integrates with the legitimate
                Gnosis Safe Proxy Factory, and has some additional safety
                checks. Currently there are four people registered as
                beneficiaries: Alice, Bob, Charlie and David. The registry has
                40 DVT tokens in balance to be distributed among them. Your goal
                is to take all funds from the registry. In a single transaction.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                To better understand this challenge, you should have an
                understanding of Gnosis Safe. I won't delve into it in this blog
                post as it requires a dedicated piece of writing.
            </p>
            <p>
                The setup function in Gnosis Safe allows anyone to execute a
                custom delegate call during the creation of the wallet. To
                exploit the contract, we can create wallets on behalf of users
                and insert calls that grant unlimited approval to us. We can
                then transfer the rewards from users' wallets to ourselves.
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

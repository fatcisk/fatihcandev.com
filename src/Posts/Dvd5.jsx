import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd5() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-5-the-rewarder"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #5: The Rewarder</h2>
            <p>
                There’s a pool offering rewards in tokens every 5 days for those
                who deposit their DVT tokens into it. Alice, Bob, Charlie and
                David have already deposited some DVT tokens, and have won their
                rewards! You don’t have any DVT tokens. But in the upcoming
                round, you must claim most rewards for yourself. By the way,
                rumours say a new pool has just launched. Isn’t it offering
                flash loans of DVT tokens?
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                In this challenge, there are two contracts: the flash loan
                contract and the reward contract. The reward contract
                periodically distributes rewards based on a snapshot of token
                balances. In this case, we can exploit the situation by waiting
                for the reward distribution, taking a large flash loan, and
                depositing all the loaned tokens into the reward pool. When we
                make the deposit, a new snapshot of the token balances is taken,
                and rewards are immediately distributed. The timing of reward
                distribution gives us a window to withdraw our deposit and
                return the flash loan.
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

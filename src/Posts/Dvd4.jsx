import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd4() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-4-side-entrance"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #4: Side Entrance</h2>
            <p>
                A surprisingly simple pool allows anyone to deposit ETH, and
                withdraw it at any point in time. It has 1000 ETH in balance
                already, and is offering free flash loans using the deposited
                ETH to promote their system. Starting with 1 ETH in balance,
                pass the challenge by taking all ETH from the pool.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                The vulnerability is the pool contract uses two seperate
                accounting systems for the same asset. To exploit this we simply
                take all the funds in the lender contract as a flash loan and
                repay the amount with the
                <span className="code-h">deposit()</span> function. This way we
                will be able to pass the balance check in{" "}
                <span className="code-h">flashLoan()</span> function while
                increasing the balance in the 'balances' mapping.
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd6() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-6-selfie"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #6: Selfie</h2>
            <p>
                A new cool lending pool has launched! It’s now offering flash
                loans of DVT tokens. It even includes a fancy governance
                mechanism to control it. What could go wrong, right ? You start
                with no DVT tokens in balance, and the pool has 1.5 million.
                Your goal is to take them all.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                We can exploit the governance protocol by utilizing a flash
                loan. When we take the flash loan, our attacker contract will
                hold a sufficient number of tokens, enabling it to propose an
                action that incorporates a malicious transaction. This
                transaction will invoke the{" "}
                <span className="code-h">emergencyExit()</span> function within
                the pool contract, and due to the governance contract being the
                msg.sender, access control within the contract will be granted.
                Consequently, the{" "}
                <span className="code-h">emergencyExit()</span> function will
                drain the pool contract by transferring all funds to our
                attacker's externally owned account (EOA). Once we have
                successfully queued our transaction, we can then return the
                flash loan. After 2 days, the action we proposed can be
                executed.
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

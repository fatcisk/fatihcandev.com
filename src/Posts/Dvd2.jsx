import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd1() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-2-naive-receiver"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4">|</span> Written by
                Fatih Isik
            </p>
            <ChallengeInfo />

            <h2 className="mb-6 color-span">Challenge #2: Naive Receiver</h2>
            <p>
                There’s a pool with 1000 ETH in balance, offering flash loans.
                It has a fixed fee of 1 ETH.
            </p>
            <p>
                A user has deployed a contract with 10 ETH in balance. It’s
                capable of interacting with the pool and receiving flash loans
                of ETH.
            </p>
            <p>
                Take all ETH out of the user’s contract. If possible, in a
                single transaction.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                Flash loan receiver contract does not have any access control
                over
                <span className="code-h">onFlashLoan()</span> function. Anyone
                can call the function and take flash loans behalf of the
                contract.
            </p>
            <p>
                To solve this challenge we will deploy another contract that
                takes 10 flash loans behalf of the flash loan receiver contract.
                Total amount of 10 ETH in fees (1 ETH for each flash loan) will
                be paid by flash loan receiver contract. At the end of the
                transaction all the ETH in the contract will be drained.
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>
                In our solution we deploy the attack contract first then call
                the <span className="code-h">init()</span> function which will
                take 10 flash loans and drain the ETH in the receiver contract.
            </p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

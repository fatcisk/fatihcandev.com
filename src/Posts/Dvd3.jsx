import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd3() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-3-truster"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />

            <h2 className="mb-6 color-span">Challenge #3: Truster</h2>
            <p>
                More and more lending pools are offering flash loans. In this
                case, a new pool has launched that is offering flash loans of
                DVT tokens for free. The pool holds 1 million DVT tokens. You
                have nothing. To pass this challenge, take all tokens out of the
                pool. If possible, in a single transaction.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                The vulnerability in this challenge is that the{" "}
                <span className="code-h">flashLoan()</span>
                function in the lender contract accepts a target and a payload
                as arguments, allowing you to call a custom function on its
                behalf with the provided arguments.
            </p>
            <p>
                To exploit the function, we can use the DVT token address as the
                target and an encoded approve function as the payload,
                essentially granting unlimited approval to the attacker
                contract. For the flash loan amount we will use 0 since the main
                objective is to grant token approvals for our custom contract.
            </p>
            <p>
                Here is the custom contract that we wrote. First, we construct
                the payload that we will pass to the flash loan function. Then,
                calling the flashLoan function with the correct arguments. After
                that, we will have unlimited approval to pool tokens. Finally,
                to steal the funds we transfer the tokens from the pool to the
                receiver address.
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>Test File</p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

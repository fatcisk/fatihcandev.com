import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd12() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-12-climber"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #12: Climber</h2>
            <p>
                There’s a secure vault contract guarding 10 million DVT tokens.
                The vault is upgradeable, following the UUPS pattern. The owner
                of the vault, currently a timelock contract, can withdraw a very
                limited amount of tokens every 15 days. On the vault there’s an
                additional role with powers to sweep all tokens in case of an
                emergency. On the timelock, only an account with a “Proposer”
                role can schedule actions that can be executed 1 hour later. To
                pass this challenge, take all tokens from the vault.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                The main vulnerability in the timelock contract is that the
                validity of actions submitted through the{" "}
                <span className="code-h">execute()</span> function is checked
                after the calls are made. To exploit the contract, we need to
                construct a flow of actions.
            </p>
            <p>
                It's worth mentioning that the caller of the actions is the
                timelock contract, which means we will be able to access
                functions that are only accessible to the timelock contract.
            </p>
            <p>
                The first step is to set the delay to zero. Then, we grant the
                attacker contract the 'PROPOSER' role (this role let the
                attacker contract be able to schedule actions to pass validation
                check). Next, we upgrade the vault contract with the contract we
                created <span className="code-h">(ClimberVaultV2)</span>, which
                includes a function to drain all the tokens. If you noticed that
                to upgrade the logic contract, we are using the{" "}
                <span className="code-h">upgradeToAndCall()</span> function,
                which upgrades the contract first and then immediately calls the
                function to drain the tokens. As the final action, we make a
                call to the
                <span className="code-h">scheduleOperation()</span> function to
                schedule the constructed actions.
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

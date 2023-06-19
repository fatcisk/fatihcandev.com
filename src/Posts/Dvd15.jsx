import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd15() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-15-abi-smuggling"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #15: ABI Smuggling</h2>
            <p>
                There’s a permissioned vault with 1 million DVT tokens
                deposited. The vault allows withdrawing funds periodically, as
                well as taking all funds out in case of emergencies. The
                contract has an embedded generic authorization scheme, only
                allowing known accounts to execute specific actions. The dev
                team has received a responsible disclosure saying all funds can
                be stolen. Before it’s too late, rescue all funds from the
                vault, transferring them back to the recovery account.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>desc</p>
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[0]} />
        </div>
    );
}

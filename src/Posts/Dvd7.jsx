import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd7() {
    const p = Posts.posts.find(
        (o) => o?.id === "damn-vulnerable-defi-solutions-7-compromised"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #7: Compromised</h2>
            <p>
                While poking around a web service of one of the most popular
                DeFi projects in the space, you get a somewhat strange response
                from their server. Here’s a snippet:
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>
                A related on-chain exchange is selling (absurdly overpriced)
                collectibles called “DVNFT”, now at 999 ETH each. This price is
                fetched from an on-chain oracle, based on 3 trusted reporters:
                0xA732...A105,0xe924...9D15 and 0x81A5...850c. Starting with
                just 0.1 ETH in balance, pass the challenge by obtaining all ETH
                available in the exchange.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                It turns out what the server returns is private keys for the
                trusted sources that provides price info to the oracle. When you
                decode the data you will see that they are private keys.
            </p>
            <p className="code-h">
                4d 48 68 6a 4e 6a 63 34 5a 57 59 78 59 57 45 30 4e 54 5a 6b 59
                54 59 31 59 7a 5a 6d 59 7a 55 34 4e 6a 46 6b 4e 44 51 34 4f 54
                4a 6a 5a 47 5a 68 59 7a 42 6a 4e 6d 4d 34 59 7a 49 31 4e 6a 42
                69 5a 6a 42 6a 4f 57 5a 69 59 32 52 68 5a 54 4a 6d 4e 44 63 7a
                4e 57 45 35
            </p>
            <p className="text-red-600 break-all">
                Key1:
                0xc678ef1aa456da65c6fc5861d44892cdfac0c6c8c2560bf0c9fbcdae2f4735a9
            </p>
            <p className="code-h">
                4d 48 67 79 4d 44 67 79 4e 44 4a 6a 4e 44 42 68 59 32 52 6d 59
                54 6c 6c 5a 44 67 34 4f 57 55 32 4f 44 56 6a 4d 6a 4d 31 4e 44
                64 68 59 32 4a 6c 5a 44 6c 69 5a 57 5a 6a 4e 6a 41 7a 4e 7a 46
                6c 4f 54 67 33 4e 57 5a 69 59 32 51 33 4d 7a 59 7a 4e 44 42 69
                59 6a 51 34
            </p>
            <p className="text-red-600 break-all">
                Key2:
                0x208242c40acdfa9ed889e685c23547acbed9befc60371e9875fbcd736340bb48
            </p>
            <p>
                Now, all we need to do is set the price of the NFT to 0, which
                will allow us to buy it without any cost. Subsequently, we will
                increase the price back to 999 ETH just before selling the NFT
                that we obtained for free. In the end, we will make a profit of
                999 ETH.
            </p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

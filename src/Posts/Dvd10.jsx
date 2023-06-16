import Posts from "../Components/Posts";
import CodeSnippet from "../Components/CodeSnippet";
import ChallengeInfo from "../Components/ChallengeInfo";

export default function Dvd10() {
    const p = Posts.posts.find(
        (o) => o.id === "damn-vulnerable-defi-solutions-10-free-rider"
    );
    return (
        <div>
            <h1 className="mb-6 md:text-5xl/[1.2]">{p.title}</h1>
            <p className="text-fade text-sm">
                {p.date} <span className="inline-block mx-4 opacity-50">|</span>{" "}
                Written by Fatih Isik
            </p>
            <ChallengeInfo />
            <h2 className="mb-6 color-span">Challenge #10: Free Rider</h2>
            <p>
                A new marketplace of Damn Valuable NFTs has been released!
                There’s been an initial mint of 6 NFTs, which are available for
                sale in the marketplace. Each one at 15 ETH. The developers
                behind it have been notified the marketplace is vulnerable. All
                tokens can be taken. Yet they have absolutely no idea how to do
                it. So they’re offering a bounty of 45 ETH for whoever is
                willing to take the NFTs out and send them their way. You’ve
                agreed to help. Although, you only have 0.1 ETH in balance. The
                devs just won’t reply to your messages asking for more. If only
                you could get free ETH, at least for an instant.
            </p>
            <h2 className="mb-6">Solution</h2>
            <p>
                One of the vulnerabilities in the contract is that when you buy
                an NFT, the marketplace sends the sales to the new owner instead
                of the seller. The second vulnerability is that if you want to
                buy multiple NFTs at once, you only send the price for one NFT
                along with the transaction, and it would not revert.
            </p>
            <p>
                To exploit the marketplace contract, we will first borrow 15 ETH
                (the price for one NFT) from the UniswapV2 pair that is created
                for us. With the borrowed funds, we will buy all the NFTs listed
                on the marketplace. Then, we will send all the NFTs to the
                bounty contract and receive our prize. Since the vulnerability
                in the contract sends the NFT price to us instead of the seller,
                all the funds in the marketplace will be taken (60 ETH). We will
                be able to return the borrowed amounts at the end of the
                transaction.
            </p>
            <CodeSnippet codeText={p.snippets[0]} />
            <p>Test file</p>
            <CodeSnippet codeText={p.snippets[1]} />
        </div>
    );
}

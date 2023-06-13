export default function ChallengeInfo() {
    return (
        <div className="mb-12 border-b border-disabled">
            <p>
                <a
                    href="https://github.com/tinchoabbate/damn-vulnerable-defi/tree/v3.0.0"
                    className="color-span hover:underline"
                >
                    Damn Vulnerable DeFi
                </a>{" "}
                is the wargame to learn offensive security of DeFi smart
                contracts in Ethereum. Featuring flash loans, price oracles,
                governance, NFTs, DEXs, lending pools, smart contract wallets,
                timelocks, and more!
            </p>
            <p>
                I will share all my solution for each challenge{" "}
                <a href="#" className="color-span hover:underline">
                    in this Github repository.
                </a>
            </p>
        </div>
    );
}

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
                I will share all of my solutions to each challenge with detailed
                explanations{" "}
                <a
                    href="https://github.com/uzayapiu/damn-vulnerable-defi"
                    className="color-span hover:underline"
                >
                    in this GitHub repository.
                </a>
            </p>
        </div>
    );
}

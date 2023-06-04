import Marquee from "react-fast-marquee";

export default function TextMarquee() {
  return (
    <div>
      <Marquee autoFill>
        <h1 className="px-2">Solidity</h1>
        <h1 className="px-2 text-accent">Foundry</h1>
      </Marquee>
      <Marquee autoFill direction="right">
        <h1 className="px-2">Ethereum</h1>
        <h1 className="px-2 text-accent">Security</h1>
      </Marquee>
      <Marquee autoFill speed={100}>
        <h1 className="px-2">Smart Contract</h1>
        <h1 className="px-2 text-accent">Hardhat</h1>
      </Marquee>
    </div>
  );
}

export default function Home() {
  return (
    <div className="text-center mb-32">
      <h1 className="">My name is Fatih</h1>
      <h1 className="mb-4">
        I am a{" "}
        <span className="text-accent font-medium">Blockchain Developer</span>
      </h1>
      <p>
        Welcome to my blockchain developer portfolio. With expertise in Solidity
        and smart contract development, I build secure and scalable blockchain
        solutions that drive innovation and reshape industries. Let's build the
        decentralized future together.
      </p>
      <div className="mt-10 space-x-3">
        <a
          href="#"
          className="inline-block bg-accent text-white font-medium p-3 rounded-lg duration-200 border hover:bg-white hover:text-accent hover:border-accent"
        >
          Download CV
        </a>
        <a
          href="#"
          className="inline-block bg-accent bg-opacity-10 font-medium text-accent p-3 rounded-lg duration-200 hover:bg-accent hover:text-white"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

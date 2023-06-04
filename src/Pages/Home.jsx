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
      <div className="mt-12 space-x-3">
        <a
          href="#"
          className="color-span p-3 border border-solid rounded-lg decoration-transparent duration-200 hover:bg-accent hover:text-white hover:brightness-100"
        >
          Download CV
        </a>
        <a
          href="#"
          className="color-span p-3 border border-solid rounded-lg decoration-transparent duration-200 hover:bg-accent hover:text-white hover:brightness-100"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

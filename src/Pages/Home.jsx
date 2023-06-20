export default function Home() {
    return (
        <div className="text-center mb-32">
            <h1 className="">My name is Fatih</h1>
            <h1 className="mb-4">
                I am a{" "}
                <span className="text-accent font-medium">
                    Blockchain Developer
                </span>
            </h1>
            <p>
                I am a blockchain developer with a deep understanding of
                Solidity, capable of creating secure and efficient smart
                contracts. Additionally, my experience as a full-stack developer
                empowers me to tackle complex challenges across the entire
                development stack. I am dedicated to delivering innovative
                blockchain solutions that drive transformative impact.
            </p>
            <div className="mt-10 space-x-3">
                <a
                    href="/resume.pdf"
                    download
                    className="inline-block bg-accent bg-opacity-10 font-medium text-accent p-3 rounded-lg duration-200 hover:bg-accent hover:text-white"
                >
                    Download CV
                </a>
                <a
                    href="/about"
                    className="inline-block bg-accent text-white font-medium p-3 rounded-lg duration-200 border hover:bg-white hover:text-accent hover:border-accent"
                >
                    Learn More
                </a>
            </div>
        </div>
    );
}

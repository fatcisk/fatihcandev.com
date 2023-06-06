export default function Articles() {
  return (
    <>
      <h1 className="mb-6 text-[27px] md:text-[38px]">Blog Posts</h1>
      {[""].map(() => (
        <div>
          <a
            href="/entry"
            className="p-6 mb-4 block border border-disabled rounded-lg hover:bg-disabled hover:bg-opacity-30"
          >
            <h2 className="font-medium mb-3 text-[20px] md:text-[27px]">
              Navigating Data Locations in Solidity
            </h2>
            <p className="text-fade">
              When it comes to developing smart contracts in Solidity,
              understanding how data is stored and accessed is crucial.
            </p>
            <p className="mb-0 opacity-70 text-base text-fade font-medium">
              January 12, 2023
            </p>
          </a>
        </div>
      ))}
    </>
  );
}

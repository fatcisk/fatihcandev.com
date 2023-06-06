import React from "react";

export default function Entry() {
  return (
    <div className="">
      <h1 className="mb-6 md:text-5xl/[1.2]">
        Navigating Data Locations in Solidity
      </h1>
      <p className="text-fade text-sm">
        January 12, 2023 <span className="inline-block mx-4">|</span> Written by
        Fatih Isik
      </p>
      <h2 className="mb-6">Introduction</h2>
      <p>
        When it comes to developing smart contracts in Solidity, understanding
        how data is stored and accessed is crucial. Solidity offers various data
        locations that dictate how variables are stored, making it essential to
        grasp the concept of data locations to write efficient and secure smart
        contracts. In this blog post, we will delve into the different data
        locations in Solidity and explore their significance in contract
        development.
      </p>
      {/* <div className="mb-6">
        <img
          className="w-full aspect-video p-3 bg-accent bg-opacity-10"
          src="https://picsum.photos/1920/1080?grayscale"
          alt=""
        />
        <p className="text-center opacity-40">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </p>
      </div> */}
      <h2 className="mb-6">Storage</h2>
      <p>
        Storage is the most commonly used data location in Solidity. It refers
        to the persistent storage space on the blockchain. Variables stored in
        the storage location remain intact between function calls and are
        accessible by all external contracts. Proper use of storage can optimize
        contract performance and facilitate data sharing.
      </p>
      <h2 className="mb-6">Memory</h2>
      <p>
        Storage is the most commonly used data location in Solidity. It refers
        to the persistent storage space on the blockchain. Variables stored in
        the storage location remain intact between function calls and are
        accessible by all external contracts. Proper use of storage can optimize
        contract performance and facilitate data sharing.
      </p>
      <h2 className="mb-6">Calldata</h2>
      <p>
        Storage is the most commonly used data location in Solidity. It refers
        to the persistent storage space on the blockchain. Variables stored in
        the storage location remain intact between function calls and are
        accessible by all external contracts. Proper use of storage can optimize
        contract performance and facilitate data sharing.
      </p>
      <h2 className="mb-6">Conclusion</h2>
      <p>
        Understanding the different data locations in Solidity is crucial for
        writing efficient and secure smart contracts. Whether it's storing data
        persistently in storage, using memory for temporary variables, or
        utilizing calldata for function parameters, each data location serves a
        specific purpose. By leveraging the appropriate data location and
        employing best practices, developers can create robust and optimized
        smart contracts that meet the requirements of their blockchain
        applications. So, dive into Solidity's data locations and unlock the
        full potential of your blockchain development endeavors.
      </p>
    </div>
  );
}

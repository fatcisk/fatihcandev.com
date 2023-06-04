import React from "react";

export default function Entry() {
  return (
    <div className="">
      <h1 className="mb-6 md:text-5xl/[1.2]">
        Based Architectures and Their Risks
      </h1>
      <p className="text-fade text-sm">
        June 12, 2023 <span className="inline-block mx-4">|</span> Written by
        Fatih Isik
      </p>
      <h2 className="mb-6">Introduction</h2>
      <p>
        One of the simplest storage options is using structs and arrays. Structs
        allow you to define custom data types with multiple properties. You can
        then create arrays of these structs to store and manage data
        efficiently. For example, imagine you're building a decentralized
        marketplace, and you want to{" "}
        <span className="color-span">store information about</span> the
        products. You could define a struct called Product with properties like
        name, price, and seller. Then, you can create an array of Product
        structs to hold information about all the listed items.
      </p>
      <p>
        One of the simplest storage options is using structs and arrays. Structs
        allow you to define custom data types with multiple properties. You can
        then create arrays of these structs to store and manage data
        efficiently. For example, imagine you're building a decentralized
        marketplace, and you want to store information about the products. You
        could define a struct called{" "}
        <span className="color-span">Product with properties</span> like name,
        price, and seller. Then, you can create an array of Product structs to
        hold information about all the listed items.
      </p>
      <div className="mb-6">
        <img
          className="w-full aspect-video p-3 bg-accent bg-opacity-10"
          src="https://picsum.photos/1920/1080?grayscale"
          alt=""
        />
        {/* <p className="text-center opacity-40">
      Lorem ipsum dolor sit amet consectetur adipisicing.
    </p> */}
      </div>
      <p>
        The current standard method through which users interact with Ethereum
        is to craft and sign transactions, messages in a specific format that
        provide all of the necessary information for the Ethereum Virtual
        Machine (EVM) to execute a state transition.
      </p>
      <h2 className="mb-6">What Are Intents?</h2>
      <p>
        One of the simplest storage options is using structs and arrays. Structs
        allow you to define custom data types with multiple properties. You can
        then create arrays of these structs to store and manage data
        efficiently. For example, imagine you're building a decentralized
        marketplace, and you want to store information about the products. You
        could define a struct called{" "}
        <span className="color-span">Product with properties</span> like name,
        price, and seller. Then, you can create an array of Product structs to
        hold information about all the listed items.
      </p>
    </div>
  );
}

export default function Articles() {
  return (
    <>
      <h1 className="mb-6">Blog Posts</h1>
      {["", ""].map(() => (
        <div>
          <a
            href="/entry"
            className="p-6 mb-4 block border border-disabled hover:bg-disabled hover:bg-opacity-30"
          >
            <h2 className="font-medium mb-3">
              Intent-Based Architectures and Their Risks
            </h2>
            <p className="text-fade">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate voluptatibus quidem quos eaque dolore quam modi nostrum,
              totam unde expedita?
            </p>
            <p className="mb-0 opacity-70 text-base text-fade font-medium">
              June 12, 2023
            </p>
          </a>
        </div>
      ))}
    </>
  );
}

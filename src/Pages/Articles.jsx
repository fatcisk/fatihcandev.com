import Posts from "../Components/Posts";

export default function Articles() {
  return (
    <>
      <h1 className="mb-6 text-[27px] md:text-[38px]">Blog Posts</h1>
      {Posts.posts.map((p) => (
        <div>
          <a
            href={`/post/${p.id}`}
            className="p-6 mb-4 block border border-disabled rounded-lg hover:bg-disabled hover:bg-opacity-30"
          >
            <h2 className="font-medium mb-3 text-[20px] md:text-[27px]">
              {p.title}
            </h2>
            <p className="text-fade">{p.description}</p>
            <p className="mb-0 opacity-70 text-base text-fade font-medium">
              {p.date}
            </p>
          </a>
        </div>
      ))}
    </>
  );
}

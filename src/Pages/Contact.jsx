export default function Contact() {
  return (
    <div>
      <h1 className="mb-6">Contact Me</h1>
      <p className="text-fade">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nihil
        nam tenetur placeat magnam mollitia!
      </p>
      <h2 className="mt-8">Email: contact@fatihdev.com</h2>
      <div className="mt-12 space-x-3">
        <a
          href="#"
          className="color-span p-3 border border-solid rounded-lg decoration-transparent duration-200 hover:bg-accent hover:text-white hover:brightness-100"
        >
          Linkedin
        </a>
        <a
          href="#"
          className="color-span p-3 border border-solid rounded-lg decoration-transparent duration-200 hover:bg-accent hover:text-white hover:brightness-100"
        >
          Github
        </a>
      </div>
    </div>
  );
}

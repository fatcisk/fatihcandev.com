export default function Contact() {
  return (
    <div>
      <h1 className="mb-6">Contact Me</h1>
      <p className="text-fade">
        Thank you for visiting my website! If you have any questions, inquiries,
        or would like to discuss a potential collaboration, I would love to hear
        from you. Please feel free to reach out to me using the contact
        information provided below.
      </p>
      <h2 className="mt-8">
        Email:{" "}
        <a className="hover:text-accent" href="mailto:contact@fatihdev.com">
          contact@fatihdev.com
        </a>
      </h2>
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

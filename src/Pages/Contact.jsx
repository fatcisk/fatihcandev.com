export default function Contact() {
  return (
    <div>
      <h1 className="mb-6">Get In Touch</h1>
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
          className="inline-block bg-accent bg-opacity-10 font-medium text-accent p-3 rounded-lg duration-200 hover:bg-accent hover:text-white"
        >
          Linkedin
        </a>
        <a
          href="#"
          className="inline-block bg-accent bg-opacity-10 font-medium text-accent p-3 rounded-lg duration-200 hover:bg-accent hover:text-white"
        >
          Github
        </a>
      </div>
    </div>
  );
}

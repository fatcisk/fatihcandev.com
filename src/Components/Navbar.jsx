export default function Navbar() {
  return (
    <div className="mb-20 mt-8 p-3 border-t border-b border-disabled">
      <div className="flex justify-around">
        <a href="/" className="hover:text-accent">
          Home
        </a>
        <a href="/about" className="text-fade hover:text-accent">
          About
        </a>
        <a href="/articles" className="text-fade hover:text-accent">
          Articles
        </a>
        <a href="/contact" className="text-fade hover:text-accent">
          Contact
        </a>
      </div>
    </div>
  );
}

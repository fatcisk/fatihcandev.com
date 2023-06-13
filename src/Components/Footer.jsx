export default function Footer() {
    return (
        <div className="flex justify-between mt-[200px] pb-32 pt-12 border-t border-disabled text-fade text-base">
            <div className="flex flex-col space-y-6">
                <a href="/about">Home</a>
                <a href="/about">About Me</a>
                <a href="/about">Blog Posts</a>
                <a href="/about">Contact Me</a>
            </div>
            <div className="flex flex-col space-y-6">
                <a href="/about">Linkedin</a>
                <a href="/about">Github</a>
                <a href="/about">Twitter</a>
                <a href="/about">Download CV</a>
            </div>
        </div>
    );
}

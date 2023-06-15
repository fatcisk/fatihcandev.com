import { useEffect } from "react";

export default function Navbar() {
    const openMobileNav = () => {
        const nav = document.querySelector(".mobile-nav");
        nav.style.display = "flex";
    };

    useEffect(() => {
        const links = document.querySelectorAll(".link");
        links.forEach((l) => {
            if (l.href == window.location.href) {
                l.style.color = "black";
            }
        });
    }, [window.location]);

    return (
        <>
            <div className="mobile-nav z-10 fixed left-0 top-0 w-full h-screen hidden flex-col justify-center items-center space-y-6 bg-white">
                <a href="/" className="link text-fade text-5xl font-medium">
                    Home
                </a>
                <a
                    href="/about"
                    className="link text-fade text-5xl font-medium"
                >
                    About
                </a>
                <a
                    href="/articles"
                    className="link text-fade text-5xl font-medium"
                >
                    Blog
                </a>
                <a
                    href="/contact"
                    className="link text-fade text-5xl font-medium"
                >
                    Contact
                </a>
            </div>
            <div className="md:hidden mb-20 py-4 border-b border-disabled">
                <div className="flex justify-between">
                    <h2 className="color-span">
                        <a href="/">Fatih Dev</a>
                    </h2>
                    <img
                        onClick={openMobileNav}
                        src="/menu.png"
                        alt=""
                        className="h-10 opacity-40"
                    />
                </div>
            </div>
            <div className="hidden md:block mb-20 mt-8 p-3 border-t border-b border-disabled">
                <div className="flex justify-around">
                    <a href="/" className="link text-fade hover:text-accent">
                        Home
                    </a>
                    <a
                        href="/about"
                        className="link text-fade hover:text-accent"
                    >
                        About
                    </a>
                    <a
                        href="/articles"
                        className="link text-fade hover:text-accent"
                    >
                        Blog
                    </a>
                    <a
                        href="/contact"
                        className="link text-fade hover:text-accent"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </>
    );
}

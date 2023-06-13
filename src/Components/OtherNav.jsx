import linksFile from "./ChallengeLinks";

export default function OtherNav() {
    return (
        <div className="mt-20 border-t border-disabled pt-12">
            <h2>See the other challenges</h2>
            <div className="mt-8 flex flex-col space-y-3">
                {linksFile.Links.map((l) => (
                    <a href={l.link} className="color-span hover:underline">
                        {l.name}
                    </a>
                ))}
            </div>
        </div>
    );
}

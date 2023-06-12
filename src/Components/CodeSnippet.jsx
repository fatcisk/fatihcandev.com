import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";

export default function CodeSnippet({ codeText }) {
    return (
        <div className="mb-12 sm:text-base text-[12px] rounded-xl overflow-hidden">
            <CodeBlock
                text={codeText}
                language="javascript"
                theme={dracula}
                showLineNumbers={false}
            />
        </div>
    );
}

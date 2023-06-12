import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";

export default function CodeSnippet({ codeText }) {
    return (
        <div className="mb-12 rounded-xl overflow-hidden">
            <CodeBlock
                text={codeText}
                language="javascript"
                theme={dracula}
                showLineNumbers={false}
            />
        </div>
    );
}

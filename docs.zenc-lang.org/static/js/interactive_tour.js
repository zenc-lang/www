document.addEventListener('DOMContentLoaded', () => {
    // Scrape the first code block from the left pane to use as the default value
    const sourceCodeBlocks = document.querySelectorAll('.tour-text-content pre code.language-zenc, .tour-text-content pre code.language-c');
    let defaultCode = `fn main() {\n    println "Write your Zen C code here.";\n}`;
    if (sourceCodeBlocks.length > 0) {
        let rawText = sourceCodeBlocks[0].innerText.trim();
        // The language tour snippets are often partials. We wrap them cleanly so they can actually compile on the fly.
        if (!rawText.includes('fn main()') && !rawText.includes('fn main(')) {
            const indentedText = rawText.split('\n').map(line => '    ' + line).join('\n');
            defaultCode = `fn main() {\n${indentedText}\n}`;
        } else {
            defaultCode = rawText;
        }
    }

    // Monaco Environment Setup
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
    require(['vs/editor/editor.main'], function () {

        // Define Zen C Syntax Highlighting
        monaco.languages.register({ id: 'zenc' });
        monaco.languages.setMonarchTokensProvider('zenc', {
            tokenizer: {
                root: [
                    [/\b(?:fn|let|const|if|else|while|for|return|break|continue|struct|enum|import|match|defer|mut|type|as|sizeof|alignof|typeof|true|false|null|inline|noinline|volatile)\b/, "keyword"],
                    [/\b(?:int|uint|i8|i16|i32|i64|u8|u16|u32|u64|f32|f64|bool|char|void|usize|isize|string)\b/, "type"],
                    [/"(?:[^"\\]|\\.)*"/, "string"],
                    [/'[^\\']'/, "string"],
                    [/\/\/.*$/, "comment"],
                    [/\/\*[\s\S]*?\*\//, "comment"],
                    [/\b\d+(\.\d+)?(?:[eE][+-]?\d+)?\b/, "number"],
                    [/[{}()\[\]]/, "delimiter"],
                    [/[+\-*\/=%&|<>!^~]+/, "operator"],
                    [/[a-zA-Z_]\w*/, "identifier"]
                ]
            }
        });

        // Initialize Editor
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
            document.body.classList.contains('dark') ||
            window.matchMedia('(prefers-color-scheme: dark)').matches;

        const currentTheme = isDark ? 'vs-dark' : 'vs';

        const editor = monaco.editor.create(document.getElementById('editor-container'), {
            value: defaultCode,
            language: 'zenc',
            theme: currentTheme,
            fontSize: 14,
            fontFamily: 'JetBrains Mono, monospace',
            minimap: { enabled: false },
            automaticLayout: true,
            cursorBlinking: 'smooth',
            padding: { top: 20 },
            scrollBeyondLastLine: false,
            wordWrap: "on"
        });

        // Handle Theme Changes (Assuming local storage or dark mode toggle)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'vs-dark' : 'vs';
                    monaco.editor.setTheme(theme);
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });

        // Run Code Button Logic
        const runBtn = document.getElementById('run-btn');
        const output = document.getElementById('output');
        const clearBtn = document.getElementById('clear-terminal');

        clearBtn.addEventListener('click', () => {
            output.innerText = "";
        });

        runBtn.addEventListener('click', async () => {
            const code = editor.getValue();
            output.innerText = "> Compiling and running...\n";
            runBtn.disabled = true;
            runBtn.style.opacity = "0.5";

            try {
                const response = await fetch('https://zenc-lang.org/api/run', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code })
                });

                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}`);
                }

                const data = await response.json();

                if (data.error && data.error !== "") {
                    // Check if it's execution failed but has output (like compile error)
                    if (data.output && data.output !== "") {
                        output.innerText = data.output;
                    } else {
                        output.innerText += "\n[Error]: " + data.error + "\n";
                    }
                } else {
                    output.innerText = data.output || "No output returned.";
                }

            } catch (error) {
                output.innerText += `\n[System Error]: ${error.message}\nEnsure the API endpoint is reachable.`;
            } finally {
                runBtn.disabled = false;
                runBtn.style.opacity = "1";
            }
        });
    });
});

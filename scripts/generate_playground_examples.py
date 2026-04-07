import os
import json
import re

def extract_examples(content_dir, output_file):
    examples = []
    rosetta_dir = os.path.join(content_dir, 'examples', 'rosetta')
    
    if not os.path.exists(rosetta_dir):
        print(f"Directory not found: {rosetta_dir}")
        return

    for filename in sorted(os.listdir(rosetta_dir)):
        if filename.endswith('.md') and filename != '_index.md':
            filepath = os.path.join(rosetta_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Extract title from frontmatter
                title_match = re.search(r'\+\+\+\s*title = "(.*?)"\s*\+\+\+', content, re.DOTALL)
                title = title_match.group(1) if title_match else filename.replace('.md', '').replace('_', ' ')
                
                # Extract first code block (zc or zenc)
                code_match = re.search(r'```(?:zc|zenc)\s*\n(.*?)\n```', content, re.DOTALL)
                if code_match:
                    code = code_match.group(1)
                    examples.append({
                        "id": filename.replace('.md', ''),
                        "title": title,
                        "code": code
                    })

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(examples, f, indent=4)
    print(f"Generated {len(examples)} examples in {output_file}")

if __name__ == "__main__":
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    content_dir = os.path.join(base_path, 'docs.zenc-lang.org', 'content')
    output_file = os.path.join(base_path, 'zenc', 'examples.json')
    extract_examples(content_dir, output_file)

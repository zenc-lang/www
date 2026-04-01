import os
import re

directory = "/home/zuhaitz/zenc-lang/www/docs.zenc-lang.org/content/tour/"

for filename in os.listdir(directory):
    if not filename.endswith(".md") or filename == "_index.md":
        continue

    filepath = os.path.join(directory, filename)
    with open(filepath, "r") as f:
        content = f.read()

    # 1. Add H1 Title
    frontmatter_match = re.search(r'\+\+\+(.*?)\+\+\+', content, re.DOTALL)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)
        title_match = re.search(r'title\s*=\s*"([^"]+)"', frontmatter)
        if title_match:
            title = title_match.group(1)
            rest_of_file = content[frontmatter_match.end():]
            if not rest_of_file.lstrip().startswith("# "):
                content = content[:frontmatter_match.end()] + f"\n\n# {title}\n" + rest_of_file

    # 2. Convert Alerts
    def replace_alert(match):
        alert_type = match.group(1).lower()
        body = match.group(2)
        # remove '> ' or '>' from start of lines
        body_clean = re.sub(r'^>\s?', '', body, flags=re.MULTILINE)
        return f'{{% alert(type="{alert_type}") %}}\n{body_clean}{{% end %}}\n'

    pattern = r'>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*\n((?:>.*\n?)+)'
    content = re.sub(pattern, replace_alert, content)

    with open(filepath, "w") as f:
        f.write(content)

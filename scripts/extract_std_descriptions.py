import os
import re

# Paths
std_dir = "/home/zuhaitz/zenc-lang/docs_and_website/www/docs.zenc-lang.org/content/std"
index_path = os.path.join(std_dir, "_index.md")

def update_descriptions():
    with open(index_path, 'r') as f:
        content = f.read()

    # Find the table rows: | **[Name](./file.md)** | Description |
    # Matches: | **[BigFloat](./bigfloat.md)** | Arbitrary-precision floating-point arithmetic. |
    matches = re.findall(r'\| \*\*\[(.*?)\]\(\./(.*?)\.md\)\*\* \| (.*?) \|', content)
    
    if not matches:
        # Try alternate format: | [Name](./file.md) | Description |
        matches = re.findall(r'\| \[(.*?)\]\(\./(.*?)\.md\) \| (.*?) \|', content)

    print(f"Found {len(matches)} modules in index.")

    for name, filename, description in matches:
        file_path = os.path.join(std_dir, f"{filename}.md")
        if not os.path.exists(file_path):
            print(f"Warning: {file_path} not found.")
            continue

        with open(file_path, 'r') as f:
            lines = f.readlines()

        if len(lines) < 2 or lines[0].strip() != "+++":
            print(f"Skipping {filename}.md (invalid frontmatter)")
            continue

        # Find the second +++
        end_idx = -1
        description_exists = False
        for i in range(1, len(lines)):
            if lines[i].strip() == "+++":
                end_idx = i
                break
            if lines[i].startswith("description ="):
                description_exists = True
                # Update existing description
                lines[i] = f'description = "{description.strip()}"\n'

        if not description_exists and end_idx != -1:
            # Insert new description before the second +++
            lines.insert(end_idx, f'description = "{description.strip()}"\n')
            print(f"Added description to {filename}.md")
        elif description_exists:
            print(f"Updated description in {filename}.md")

        with open(file_path, 'w') as f:
            f.writelines(lines)

if __name__ == "__main__":
    update_descriptions()

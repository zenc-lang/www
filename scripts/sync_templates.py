import os
import shutil

# Configuration
SOURCE_DIR = "/home/zuhaitz/zenc-lang/docs_and_website/www/docs.zenc-lang.org/templates"
TARGET_DIR = "/home/zuhaitz/zenc-lang/docs_and_website/docs/site/templates"

# Files to sync (relative to SOURCE_DIR)
FILES_TO_SYNC = [
    "base.html",
    "section.html",
    "page.html",
    "shortcodes/alert.html",
]

def sync_templates():
    print(f"Synchronizing templates from {SOURCE_DIR} to {TARGET_DIR}...")
    
    for relative_path in FILES_TO_SYNC:
        source_path = os.path.join(SOURCE_DIR, relative_path)
        target_path = os.path.join(TARGET_DIR, relative_path)
        
        if not os.path.exists(source_path):
            print(f"  [SKIP] {relative_path} (source does not exist)")
            continue
            
        # Ensure target directory exists
        os.makedirs(os.path.dirname(target_path), exist_ok=True)
        
        # Copy the file
        shutil.copy2(source_path, target_path)
        print(f"  [SYNC] {relative_path}")

    print("Synchronization complete.")

if __name__ == "__main__":
    sync_templates()

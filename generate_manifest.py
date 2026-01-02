import os
import json
import re
from PIL import Image

DIRECTORIES = [
    {'path': 'gallery/screenshots', 'output': 'gallery/images.json'},
    {'path': 'photos', 'output': 'gallery/photos.json'},
    {'path': 'gallery/pinned', 'output': 'gallery/pinned.json'},
    {'path': 'gallery/voice', 'output': 'gallery/tracks.json'},
    {'path': 'gallery/voice2', 'output': 'gallery/voice_pinned.json'}
]

valid_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp3', '.wav', '.ogg', '.opus')

for entry in DIRECTORIES:
    source_dir = entry['path']
    output_file = entry['output']
    images_data = []

    if not os.path.exists(source_dir):
        print(f"Directory not found: {source_dir}, skipping.")
        # Create empty manifest to prevent 404s
        with open(output_file, 'w') as f:
            json.dump([], f)
        continue

    print(f"Scanning {source_dir}...")
    for filename in sorted(os.listdir(source_dir)):
        if filename.lower().endswith(valid_extensions):
            file_path = os.path.join(source_dir, filename)
            file_info = {
                "name": filename,
                "mtime": int(os.path.getmtime(file_path))
            }

            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                try:
                    with Image.open(file_path) as img:
                        width, height = img.size
                        file_info['width'] = width
                        file_info['height'] = height
                except Exception as e:
                    print(f"Error processing image {filename}: {e}")
            
            images_data.append(file_info)

    with open(output_file, 'w') as f:
        json.dump(images_data, f, indent=2)

    print(f"Generated {output_file} with {len(images_data)} images.")

# --- Words / Notes Processing ---
import datetime
import random

NOTES_DIR = 'words'
NOTES_OUTPUT = 'words/notes.json'
# User requested gray/neutral only. We will handle styling in CSS.
# Leaving field empty or None.

if os.path.exists(NOTES_DIR):
    print(f"Scanning {NOTES_DIR} for notes...")
    notes_data = []



    for filename in sorted(os.listdir(NOTES_DIR)):
        if filename.lower().endswith(('.txt', '.md')):
            file_path = os.path.join(NOTES_DIR, filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Pre-process content to fix "one word per line" issue
                # 1. Normalize line endings
                text = content.replace('\r\n', '\n').replace('\r', '\n')
                
                # Check if it's a checklist
                is_checklist = '- [ ]' in text or '- [x]' in text
                
                if not is_checklist:
                     # 2. Collapse multiple newlines (paragraph breaks) to placeholder
                    text = re.sub(r'\n\s*\n+', '[[PARAGRAPH]]', text)
                    
                    # 3. Replace single newlines (and surrounding whitespace) with a single space
                    text = re.sub(r'\s*\n\s*', ' ', text)
                    
                    # 4. Restore paragraphs
                    text = text.replace('[[PARAGRAPH]]', '\n\n')
                    
                    content = text

                mtime = os.path.getmtime(file_path)
                date_str = datetime.datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
                
                title = os.path.splitext(filename)[0]
                
                notes_data.append({
                    "title": title,
                    "content": content,
                    "date": date_str,
                    "color": "" # clear color
                })
            except Exception as e:
                print(f"Error reading note {filename}: {e}")

    with open(NOTES_OUTPUT, 'w') as f:
        json.dump(notes_data, f, indent=2)
    
    print(f"Generated {NOTES_OUTPUT} with {len(notes_data)} notes.")

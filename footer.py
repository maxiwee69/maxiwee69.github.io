import os
import re

# Specify the directory you want to start from
root_dir = r'C:\Users\maxi\maxiwee69.github.io'

# Walk through all subdirectories
for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        filepath = os.path.join(dirpath, filename)
        if filename.endswith('.html'):
            with open(filepath, 'r+') as file:
                # Read the existing content
                content = file.read()
                # Remove the footer
                content = re.sub(r'<footer>.*?</footer>', '', content, flags=re.DOTALL)
                # Write the new content back to the file
                file.seek(0)
                file.write(content)
                file.truncate()
                print(f'Removed footer from: {filepath}')
        elif filename.endswith('.css'):
            with open(filepath, 'r+') as file:
                # Read the existing content
                content = file.read()
                # Remove the footer CSS rules
                content = re.sub(r'footer\s*{[^}]*}', '', content)
                # Write the new content back to the file
                file.seek(0)
                file.write(content)
                file.truncate()
                print(f'Removed footer CSS from: {filepath}')

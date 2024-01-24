import os
import re

# Specify the directory you want to start from
root_dir = r'C:\Users\maxi\maxiwee69.github.io'

# Define the footer CSS you want to add
footer_css = """.footer {
  background-color: #0a0a15; /* Darker blue */
  color: #e0e0e0; /* Lighter color for the footer text */
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  width: 100%;
  flex-shrink: 0;
}"""

# Walk through all subdirectories
for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        # Check if the file is a CSS file
        if filename.endswith('.css'):
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r+') as file:
                # Read the existing content
                content = file.read()
                # Check if the footer background-color is set to #0a0a15
                if re.search(r'\.footer\s*{\s*background-color:\s*#0a0a15;', content):
                    print(f'Found matching file: {filepath}')
                    # If yes, replace the entire .footer CSS with the new one
                    content = re.sub(r'(\.footer\s*{[^}]*})', footer_css, content)
                    # Write the new content back to the file
                    file.seek(0)
                    file.write(content)
                    file.truncate()
                    print(f'Updated file: {filepath}')

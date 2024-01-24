import os

# Define the meta tag you want to add
meta_tag = '<meta name="viewport" content="width=device-width, initial-scale=1.0">'

# Specify the directory you want to start from
root_dir = r'C:\Users\maxi\maxiwee69.github.io'

# Walk through all subdirectories
for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        # Check if the file is an index.html file
        if filename == 'index.html':
            filepath = os.path.join(dirpath, filename)
            print(f'Found file: {filepath}')
            with open(filepath, 'r+') as file:
                # Read the existing content
                content = file.read()
                # Check if the meta tag already exists
                if meta_tag not in content:
                    # If not, add the meta tag after the opening head tag
                    content = content.replace('<head>', '<head>\n' + meta_tag, 1)
                    # Write the new content back to the file
                    file.seek(0)
                    file.write(content)
                    file.truncate()
                    print(f'Meta tag added to: {filepath}')
                else:
                    print(f'Meta tag already exists in: {filepath}')

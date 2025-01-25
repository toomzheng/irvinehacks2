import os
import shutil

# Define source and destination directories
source_dir = '/private/var/folders/z5/f2p3m19x1jj43qhhdb47bymc0000gn/T/Untitled Project_AME'
destination_dir = '/private/var/folders/z5/f2p3m19x1jj43qhhdb47bymc0000gn/T/Untitled Project_AME/Lebron_vids'

# Create destination directory if it doesn't exist
os.makedirs(destination_dir, exist_ok=True)

# Iterate through files in the source directory
for filename in os.listdir(source_dir):
    if filename.endswith('.mp4'):
        source_path = os.path.join(source_dir, filename)
        destination_path = os.path.join(destination_dir, filename)
        shutil.move(source_path, destination_path)

print("All mp4 files have been moved.")

import os

def rename_mp4_files(folder_path):
    try:
        # List all files in the folder with .mp4 extension
        files = [f for f in os.listdir(folder_path) if f.endswith('.mp4')]
        
        # Sort files to ensure consistent renaming order
        files.sort()

        # Rename each file
        for index, file in enumerate(files):
            new_name = f"vid{index + 1}.mp4"
            old_path = os.path.join(folder_path, file)
            new_path = os.path.join(folder_path, new_name)
            os.rename(old_path, new_path)

        print("Renaming completed successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Specify the folder path
folder_path = "/Users/xunhongjiang/Documents/GitHub/irvinehacks2/Lebron_vids"
rename_mp4_files(folder_path)

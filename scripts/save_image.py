import sys
import json
import os
from download_image import download_and_save_image

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Arguments required"}))
        sys.exit(1)
    
    try:
        data = json.loads(sys.argv[1])
        url = data["url"]
        output_dir = data.get("outputDir", "public/assets/persons")
        filename = data["filename"]
        
        if not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)
        
        save_path = os.path.join(output_dir, filename)
        
        success = download_and_save_image(url, save_path, min_size=(300, 300))
        
        if success:
            print(json.dumps({
                "success": True,
                "path": f"/assets/persons/{filename}"
            }))
        else:
            print(json.dumps({
                "success": False,
                "error": "Failed to download or save image"
            }))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)

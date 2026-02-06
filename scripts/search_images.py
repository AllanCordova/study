import sys
import json
from download_image import search_google_images

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Query is required"}))
        sys.exit(1)
    
    query = sys.argv[1]
    max_results = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    preferred_sites = sys.argv[3].split(",") if len(sys.argv) > 3 else ["pinterest.com", "deviantart.com", "artstation.com"]
    
    try:
        image_urls = search_google_images(query, max_results, preferred_sites)
        print(json.dumps({"imageUrls": image_urls}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

from flask import Flask, jsonify, send_file, abort, render_template, send_from_directory
from flask_cors import CORS
import os
from mimetypes import guess_type
from werkzeug.utils import secure_filename

app = Flask(__name__)

# ✅ Fix CORS Issues
CORS(app, supports_credentials=True, origins=["http://localhost:8000"])

# ✅ Allow Preflight Requests
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:8000"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# Define the base path where your folders and images are stored
BASE_PATH = "/home/ubuntu/Capturesque/Images"  # Update this to your actual image storage path

@app.route('/getJS/<fnam>')
def getpage(fnam):
    """Serve JavaScript files if needed."""
    return send_from_directory('static', secure_filename(fnam))

@app.route('/api/images', methods=['GET'])
def get_folders():
    """List all available folders in the BASE_PATH directory."""
    try:
        folders = [folder for folder in os.listdir(BASE_PATH) if os.path.isdir(os.path.join(BASE_PATH, folder))]
        return jsonify({"folders": folders})
    except Exception as e:
        return jsonify({"error": f"Failed to fetch folders: {str(e)}"}), 500

@app.route('/api/images/<foldername>', methods=['GET'])
def get_folder_images(foldername):
    """List all image files in a specific folder."""
    foldername = secure_filename(foldername)
    folder_path = os.path.join(BASE_PATH, foldername)
    if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
        return jsonify({"error": "Folder not found"}), 404

    try:
        images = []
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path) and filename.lower().endswith(('png', 'jpg', 'jpeg', 'gif')):
                images.append({
                    "id": filename,
                    "name": filename,
                    "url": f"http://150.230.138.173:8087/api/image/{foldername}/{filename}",
                    "thumbnail": f"http://150.230.138.173:8087/api/image/{foldername}/{filename}",
                    "download": f"http://150.230.138.173:8087/api/download/{foldername}/{filename}"
                })
        
        if not images:
            return jsonify({"message": "No images found in this folder."}), 200
        
        return jsonify(images)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch images: {str(e)}"}), 500
    
@app.route('/api/folders/<parent_folder>', methods=['GET'])
def get_subfolders(parent_folder):
    """List all subfolders inside a specific folder (like 'Feature/')."""
    parent_folder = secure_filename(parent_folder)
    folder_path = os.path.join(BASE_PATH, parent_folder)
    
    if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
        return jsonify({"error": "Folder not found"}), 404

    try:
        subfolders = [sf for sf in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path, sf))]
        return jsonify({"subfolders": subfolders})
    except Exception as e:
        return jsonify({"error": f"Failed to fetch subfolders: {str(e)}"}), 500

@app.route('/api/image/<foldername>/<filename>', methods=['GET'])
def get_image(foldername, filename):
    """Serve an image file from a specific folder."""
    foldername = secure_filename(foldername)
    filename = secure_filename(filename)
    file_path = os.path.join(BASE_PATH, foldername, filename)
    if not os.path.exists(file_path) or not os.path.isfile(file_path):
        return jsonify({"error": "Image not found"}), 404

    try:
        mimetype, _ = guess_type(file_path)
        return send_file(file_path, mimetype=mimetype if mimetype else 'application/octet-stream')
    except Exception as e:
        return jsonify({"error": f"Failed to fetch image: {str(e)}"}), 500

@app.route('/api/download/<foldername>/<filename>', methods=['GET'])
def download_image(foldername, filename):
    """Serve an image file as a downloadable file."""
    foldername = secure_filename(foldername)
    filename = secure_filename(filename)
    file_path = os.path.join(BASE_PATH, foldername, filename)
    if not os.path.exists(file_path) or not os.path.isfile(file_path):
        return jsonify({"error": "Image not found"}), 404

    try:
        return send_file(file_path, as_attachment=True, conditional=True)
    except Exception as e:
        return jsonify({"error": f"Failed to download image: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8087)

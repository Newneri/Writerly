import React, { useState } from "react";

const ImageUploader = ({ onUpload }: { onUpload?: (url: string) => void }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (!file) return;

        // ✅ Ensure the file is valid before previewing
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        uploadToCloudinary(file);
    };

    const uploadToCloudinary = async (file: any) => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "writerly-posts-images"); // ✅ set this in Cloudinary

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dwhwqbgwz/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log("Uploaded image:", data.secure_url);

            // Callback to parent component
            if (onUpload) onUpload(data.secure_url);
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <label className="inline-block text-sm font-medium text-white rounded cursor-pointer" htmlFor="file">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 text-primary" stroke="none" fill="currentColor"><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
            </label>
            <input type="file" id="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            {uploading && <p className="text-text-secondary">Uploading...</p>}
            {imagePreview && <img src={imagePreview} alt="preview" className="mt-3 w-48 rounded-md border border-border-stroke" />}
        </>
    );
};

export default ImageUploader;

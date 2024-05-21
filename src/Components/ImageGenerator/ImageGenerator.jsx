import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.jpg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState(default_image);
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }
        setLoading(true);
        // Fetch image from Unsplash API based on user input
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(inputRef.current.value)}&client_id=Tys6CeuADC0KMezsBj-y1Gc3mB6VQQBryW_NOOblptU`);
        const data = await response.json();
        if (data.urls && data.urls.regular) {
            setImage_url(data.urls.regular);
        } else {
            setImage_url(default_image);
        }
        setLoading(false);
    }

    return (
        <div className='ai-image-generator'>
            <div className='header'>AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url} alt="" />
                </div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading.....</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className="search-input" placeholder='Describe what you want to see' />
                <div className="generate-btn" onClick={imageGenerator}>Generate</div>
            </div>
        </div>
    );
}

export default ImageGenerator;

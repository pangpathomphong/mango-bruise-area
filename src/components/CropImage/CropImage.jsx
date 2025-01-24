import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CropImage.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';

const CropImage = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();

    const handleAboutUs = useCallback(() => navigate('/aboutuspage'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactuspage'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/userprofilepage'), [navigate]);
    const handleDashboard = useCallback(() => navigate('/dashboardpage'), [navigate]);
    const handleFeatureAnalysis = useCallback(() => navigate('/featureanalysis'), [navigate]);
    const handleResize = useCallback(() => navigate('/resize'), [navigate]);

    const handleFileChange = useCallback((event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file.name));
        
        if (validFiles.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
        } else {
            alert('Only .jpg, .jpeg, and .png files are allowed.');
        }
    }, []);

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragActive(false);
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        setDragActive(false);
        const files = Array.from(event.dataTransfer.files);
        const validFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file.name));

        if (validFiles.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
        } else {
            alert('Only .jpg, .jpeg, and .png files are allowed.');
        }
    }, []);

    const handleFileDelete = useCallback((index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }, []);

    const handleUpload = useCallback(() => {
        const fileData = selectedFiles.map((file, index) => ({
            id: index + 1,
            photoName: file.name,
            date: new Date().toLocaleString(),
            area: "---",
            percentage: "---"
        }));
        
        localStorage.setItem('uploadedFiles', JSON.stringify(fileData));
        navigate('/showareacalculation');
    }, [selectedFiles, navigate]);

    return (
        <div className="bruiseareacalculation-page">
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" />
                </div>
                <div className="navbar-links">
                    <button className="navbar-link" onClick={handleDashboard}>Dashboard</button>
                    <button className="navbar-link">Bruised Area Calculation</button>
                    <button className="navbar-link" onClick={handleFeatureAnalysis}>Feature Analysis</button>
                    <button className="navbar-link" onClick={handleResize}>Resize</button>
                    <button className="navbar-link" onClick={handleAboutUs}>About Us</button>
                    <button className="navbar-link" onClick={handleContactUs}>Contact Us</button>
                </div>
                <div className="navbar-profile" onClick={handleUserProfile}>
                    <img src={userProfileImg} alt="User Profile" className="user-profile" />
                </div>
            </nav>

            <div className="bruiseareacalculation-content">
                <h1 className="bruiseareacalculation-title">Crop Image</h1>
                <p className="bruise-description">
                    The Crop image tool transforms your images into the perfect size in seconds.
                </p>
                <div className="file-upload-container">
                    <div
                        className={`file-dropzone ${dragActive ? 'drag-active' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <p>Drag & Drop your images here or</p>
                        <input
                            type="file"
                            className="file-input"
                            id="file-upload"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                            multiple
                        />
                        <label htmlFor="file-upload" className="browse-bruiseareacalculation-btn">
                            Browse 📁
                        </label>
                        <p>🚨Only .jpg .jpeg .png files are allowed</p>
                    </div>

                    <div className="selected-files-box">
                        <h3>Selected Files:</h3>
                        <ul>
                            {selectedFiles.map((file, index) => (
                                <li key={index} className="file-item">
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleFileDelete(index)}
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="bt backto-bt" onClick={handleDashboard}>
                        Cancle
                    </button>
                    <button className="bt upload-bruiseareacalculation-bt" onClick={handleUpload}>
                        Upload
                    </button>
                </div>
            </div>

            <footer className="footer-bruiseareacalculation">
                <div className="footer-address-bruiseareacalculation">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default CropImage;

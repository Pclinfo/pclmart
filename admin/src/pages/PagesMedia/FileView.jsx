import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const FileView = () => {
    const navigate = useNavigate();
    const [folderName, setFolderName] = useState('');
    const [files, setFiles] = useState([]);

    useEffect(() => {

        const storedFolderName = localStorage.getItem('selectedFolderName');
        const storedFiles = localStorage.getItem('selectedFolderFiles');

        if (storedFolderName && storedFiles) {
            setFolderName(storedFolderName);
            setFiles(JSON.parse(storedFiles));
        } else {

            navigate('/pagesmedia/media-gallery');
        }


        return () => {
            localStorage.removeItem('selectedFolderName');
            localStorage.removeItem('selectedFolderFiles');
        };
    }, [navigate]);

    const renderFilePreview = (fileName) => {
        const fileExtension = fileName.split('.').pop().toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
        const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
        const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];
        const documentExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf'];

        const fileUrl = `${config.apiUrl}/uploads/${folderName}/${fileName}`;

        if (imageExtensions.includes(fileExtension)) {
            return (
                <img
                    src={fileUrl}
                    alt={fileName}
                    className="w-full h-64 object-cover rounded-lg"
                />
            );
        }

        if (videoExtensions.includes(fileExtension)) {
            return (
                <video
                    controls
                    className="w-full h-64 rounded-lg"
                >
                    <source src={fileUrl} type={`video/${fileExtension}`} />
                    Your browser does not support the video tag.
                </video>
            );
        }

        if (audioExtensions.includes(fileExtension)) {
            return (
                <div className="w-full h-64 bg-gray-100 flex flex-col items-center justify-center rounded-lg">
                    <i className="fas fa-music text-4xl text-gray-500 mb-4"></i>
                    <audio controls>
                        <source src={fileUrl} type={`audio/${fileExtension}`} />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            );
        }

        if (documentExtensions.includes(fileExtension)) {
            return (
                <div className="w-full h-64 bg-blue-100 flex flex-col items-center justify-center rounded-lg">
                    <i className="fas fa-file-alt text-4xl text-blue-500 mb-4"></i>
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Open {fileName}
                    </a>
                </div>
            );
        }

        return (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg">
                <span className="text-gray-500 uppercase font-bold text-2xl">
                    {fileExtension}
                </span>
            </div>
        );
    };

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-4">
                    <div className="max-w-7xl mx-auto p-4 space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => navigate('/media-gallery')}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    ← Back to Folders
                                </button>
                                <h1 className="text-xl font-semibold ml-4">
                                    Files in {folderName} Folder
                                </h1>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {renderFilePreview(file)}
                                    <div className="p-3">
                                        <p className="text-sm truncate font-medium">{file}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileView;
import React, { useState } from 'react';

const VideoPlayer = ({ imdbId }) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoButtonClick = () => {
    setShowVideo(true);
  };

  return (
    <div >
      {showVideo ? (
        <div className="opacity-100 transition-opacity duration-500 inset-0 flex items-center justify-center relative">
            <div className="containerxz">
                <iframe className="responsive-iframexz" src={`https://vidsrc.to/embed/movie/${imdbId}`} allow="autoplay; fullscreen; picture-in-picture accelerometer; encrypted-media; gyroscope;"
            allowFullScreen></iframe>
            </div>

        </div>
      ) : (
        <button
          onClick={handleVideoButtonClick}
          className="opacity-100 transition-opacity duration-500 mb-4 mr-4 flex cursor-pointer items-center justify-between rounded-md border-none bg-app-greyish-blue py-3 px-8 text-sm font-medium text-app-pure-white hover:bg-app-pure-white hover:text-app-dark-blue"
        >
          Watch Movie
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
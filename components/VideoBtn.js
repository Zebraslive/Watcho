import { useState } from 'react';
import Modal from 'react-modal';
import { FiPlay } from 'react-icons/fi'; 
export default function Navigation({imdb}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleWatchButtonClick = () => {
        setIsModalOpen(true);
      };
    return (<>
    <button
        onClick={handleWatchButtonClick}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md"
        >
        <FiPlay className="mr-2" />
        Watch Movie Now
        </button>
        
        {/* Video modal */}
        <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Watch Movie"
        className="p-4 bg-app-semi-dark-blue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="fixed inset-0 bg-black"
        >
        {/* Video embed iframe */}
        <iframe
        width="100%"
        height="100%"
        src={`https://vidsrc.to/embed/movie/${imdb}`}
        title="Movie"
        allowFullScreen
        />
        </Modal>
    </>
        
    )
  }

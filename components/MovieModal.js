import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function MovieModal({ isOpen, onClose, imdbId }) {
    
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-app-semi-dark-blue bg-opacity-77 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full max-w-screen-lg mx-auto">
          <iframe
            src={`https://vidsrc.to/embed/movie/${imdbId}`}
            title="Movie"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
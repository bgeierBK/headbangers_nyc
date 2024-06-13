import React from 'react'

function Modal({photo, closeModal}){
    if(!photo) return null;

    return(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='relative bg-white p-4 rounded-md'>
                <button onClick={closeModal} className='absolute top-2 right-2 text-gray-600'>
                    X
                </button>
                <img
          src={photo.url}
          alt='photo taken at venue'
          className='max-w-full h-auto max-h-96 object-contain'
        />
            </div>
        </div>
    )
}
export default Modal

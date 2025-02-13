import React from 'react';

const HolidayDetailModal = ({ holiday, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{holiday.name}</h2>
        <p><strong>Date:</strong> {holiday.date.iso}</p>
        <p><strong>Type:</strong> {holiday.type.join(', ')}</p>
        <p><strong>Description:</strong> {holiday.description || 'No description available.'}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HolidayDetailModal;
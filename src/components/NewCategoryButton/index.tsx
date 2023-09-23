import React from 'react';

interface AddDataButtonProps {
  onAddData: () => void;
}

const AddDataButton: React.FC<AddDataButtonProps> = ({ onAddData }) => {
  return (
    <button className='btn btn-primary' onClick={onAddData}>Add New Data</button>
  );
}

export default AddDataButton;

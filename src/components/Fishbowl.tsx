import React from 'react';

const Fishbowl = () => {
  return (
    <div className="w-1/2 flex justify-center mr-10 mb-20" style={{ height: '75vh' }}>
      <div className="relative bg-gradient-to-b from-transparent to-white shadow-md rounded-full border-4 border-white"  style={{ width: '80%', height: '100%' }}>
        <div className="absolute top-1/2 left-3 right-3 bottom-3 bg-blue-300/30 rounded-bl-full rounded-br-full transform origin-top-center"></div>
      </div>
      <div></div>
    </div>
    
  );
};

export default Fishbowl;
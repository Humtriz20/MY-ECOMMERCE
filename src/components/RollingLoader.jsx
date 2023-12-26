import React from 'react';

const RollingLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-r-4  rounded-full"></div>
      </div>
    </div>
  )
};

export default RollingLoader;

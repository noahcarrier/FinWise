import React, { ReactNode } from 'react';

interface FishbowlBackgroundProps {
  children: ReactNode;
}

const FishbowlBackground: React.FC<FishbowlBackgroundProps> = ({ children }) => {
  return (
    <div
      className="fishbowl-background"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          @keyframes water-animation {
            0% { transform: translateY(-2px); }
            100% { transform: translateY(2px); }
          }
          @keyframes sand-animation {
            0% { transform: translateX(-2px); }
            100% { transform: translateX(2px); }
          }
          .water::before {
            content: '';
            position: absolute;
            top: -50px;
            left: 0;
            width: 100%;
            height: 200px;
            background: linear-gradient(180deg, rgba(0, 0, 255, 0.2), rgba(0, 0, 255, 0.4));
            animation: water-animation 5s infinite alternate;
          }
          .sand::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background: linear-gradient(180deg, rgba(255, 255, 0, 0.4), rgba(255, 255, 0, 0.2));
            animation: sand-animation 5s infinite alternate;
          }
        `}
      </style>
      <div
        className="water"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <div
        className="sand"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20%',
        }}
      />
      {children}
    </div>
  );
};

export default FishbowlBackground;

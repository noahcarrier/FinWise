import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="bg-gray-900 h-screen flex justify-center items-center relative">
      <style jsx global>{`
        .bowl {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
            padding: 0;
            width: 300px;
            height: 300px;
            background: rgba(255,255,255,.1);
            border-radius: 50%;
            border: 4px solid #fff;
            transform-origin: bottom center;
            animation: animateBowl 8s linear infinite;
        }

        .bowl::before{
            content: '';
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 40%;
            height: 30px;
            background: rgba(66,66,66);
            border: 4px solid #fff;
            border-radius: 50%;
        }

        .bowl::after
        {
            content: '';
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 150px;
            height: 80px;
            background: rgba(255,255,255,.03);
            border-radius: 50%;
        }

        .water
        {
            position: absolute;
            top: 50%;
            left: 5px;
            right: 5px;
            bottom: 5px;
            background: rgba(65,193,251,0.3);
            border-bottom-left-radius: 150px; 
            border-bottom-right-radius: 150px; 
            transform-origin: top center;
            animation: animateWater 8s ease-in-out infinite;
        }

        .water::before
        {
            content: '';
            position: absolute;
            top: -10px;
            left: 0;
            width: 100%;
            height: 20px;
            background: #1fa4e0;
            border-radius: 50%;
            z-index: 1;
        }

        @keyframes animateBowl {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            25% {
              transform: translate(-50%, -50%) rotate(15deg);
            }
            50% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            75% {
              transform: translate(-50%, -50%) rotate(-15deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
          }
  
          @keyframes animateWater {
            0% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(-20deg);
            }
            50% {
              transform: rotate(0deg);
            }
            75% {
              transform: rotate(20deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
      `}</style>
        <div>
      <div className="bowl">
        <div className="water"></div>
      </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

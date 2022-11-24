import React from 'react';
import Particles from 'react-tsparticles';
import Webcam from 'react-webcam';

type Props = {
  height: number;
  width: number;
  webCamRef: React.RefObject<Webcam>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onWebCamLoad: React.ReactEventHandler<HTMLVideoElement>;
};

const WebCam = ({
  height,
  width,
  webCamRef,
  canvasRef,
  onWebCamLoad
}: Props) => {
  const videoConstraints = {
    width: 640,
    height: 480
  };

  return (
    <div className="relative bg-gray-600 w-full h-full flex justify-center items-center">
      {!webCamRef.current && (
        <span className="absolute z-10 text-xl text-white">
          Cargando cámara...
        </span>
      )}
      <Particles
        options={{
          preset: 'links',
          fullScreen: true,
          particles: {
            color: {
              value: '#ffffff'
            },
            links: {
              color: '#ffffff',
              distance: 100,
              enable: true,
              opacity: 0.3,
              width: 0.5
            },
            collisions: {
              enable: true
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 0,
              straight: false
            },
            number: {
              density: {
                enable: true,
                value_area: 1000
              },
              value: 80
            },
            opacity: {
              value: 0.3
            },
            shape: {
              type: 'square'
            },
            size: {
              random: true,
              value: 5
            }
          },
          detectRetina: true
        }}
      />
      <div className="relative rounded-2xl border-4 border- overflow-hidden">
        <Webcam
          muted
          onLoadedData={onWebCamLoad}
          ref={webCamRef}
          videoConstraints={videoConstraints}
        />
        <canvas
          style={{ position: 'absolute', top: '0' }}
          ref={canvasRef}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default WebCam;

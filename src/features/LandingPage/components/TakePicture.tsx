import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import async from 'async';
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import { storage } from './firebase';

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const key = '4026e806cce2491a9a41f925673049b5';
const endpoint =
  'https://computer-vision-api-hack4edu.cognitiveservices.azure.com/';

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }),
  endpoint
);

let detectionLabel: string;
let band = false;

const computerVision = (imageUrl: string) => {
  async.series(
    [
      async function () {
        /**
         * DETECT TAGS
         * Detects tags for an image, which returns:
         *     all objects in image and confidence score.
         */

        const tagsURL = imageUrl;

        const { tags } = await computerVisionClient.analyzeImage(tagsURL, {
          visualFeatures: ['Tags']
        });
        // Format tags for display
        // function formatTags(tags) {
        //   return tags
        //     .map((tag) => `${tag.name} (${tag.confidence.toFixed(2)})`)
        //     .join(', ');
        // }
        // console.log(`Tags: ${formatTags(tags)}`);
        const listOfTags = ['hat', 'frog', 'amphibian', 'bridge'];
        for (let i = 0; i < tags.length; i++) {
          if (listOfTags.includes(tags[i].name)) {
            if (tags[i].name === 'hat') {
              detectionLabel = 'Es un sombrero pintado';
            } else if (tags[i].name === 'frog') {
              detectionLabel = 'Es una rana dorada';
            } else if (tags[i].name === 'amphibian') {
              detectionLabel = 'Es una rana dorada';
            } else if (tags[i].name === 'bridge') {
              detectionLabel = 'Es el Puente de las Américas';
            }
            band = true;
            break;
          }
          console.log(tags[i].name);
        }
      },
      function () {
        return new Promise<void>((resolve) => {
          resolve();
        });
      }
    ],
    (err) => {
      throw err;
    }
  );
};

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user'
};

const Profile = () => {
  const [picture, setPicture] = useState('');
  const [modelURL, setModelURL] = useState('');
  const webcamRef = useRef(null);

  const show3DModel = () => {
    if (detectionLabel === 'Es un sombrero pintado') {
      setModelURL(
        'https://sketchfab.com/models/139d4836d2484260a78294530a5eb8c1/embed'
      );
    } else if (detectionLabel === 'Es una rana dorada') {
      setModelURL(
        'https://sketchfab.com/models/bca455468245401fbfe686e57a2c214e/embed'
      );
    } else if (detectionLabel === 'Es el Puente de las Américas') {
      setModelURL(
        'https://sketchfab.com/models/2aeb94175d214eda8f4bb053a77a1eed/embed'
      );
    }
  };

  // Get image from Firebase storage
  const getImageUrl = () => {
    const storage2 = getStorage();
    getDownloadURL(ref(storage2, 'image.jpeg')).then((imageUrl) => {
      computerVision(imageUrl);
    });
  };

  // Upload image to Firebase storage
  const upload = async (img: string) => {
    const base64Response = await fetch(img);
    const blob = await base64Response.blob();

    const file = new File([blob], 'image.jpeg', { type: 'image/jpeg' });
    const storageRef = ref(storage, 'image.jpeg');
    uploadBytes(storageRef, file);
    getImageUrl();
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture(imageSrc);
  });

  return (
    <main>
      <div className="flex justify-center py-4">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/team-edge.appspot.com/o/projectFiles%2Feonfolk.png?alt=media&token=fb0d29c3-fec2-4de0-8b61-d0e82058d011"
          alt=""
          height={500}
          width={500}
        />
      </div>
      <div className="flex justify-center space-x-4">
        <Webcam
          className="rounded-2xl border-4 border-black"
          audio={false}
          height={400}
          ref={webcamRef}
          width={400}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />

        <iframe
          title="Bridge Of The Americas, Panama"
          frameBorder="0"
          allowFullScreen
          // allowFullScreen="true"
          // webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          src={modelURL}
        />
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
          className="flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Capturar
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            upload(picture);
          }}
          className="flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Identificar
        </button>
      </div>

      <h1 className="text-center font-bold text-4xl py-4">{detectionLabel}</h1>

      {band && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              show3DModel();
            }}
            className="flex justify-center px-4 py-4 mt-4 text-sm font-medium text-white bg-green-900 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Mostrar Modelo 3D
          </button>
        </div>
      )}
    </main>
  );
};
export default Profile;

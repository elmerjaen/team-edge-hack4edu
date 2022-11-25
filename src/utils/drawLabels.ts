/* eslint-disable no-param-reassign */
const labelMap = {
  1: { name: 'A', color: 'red' },
  2: { name: 'Amor', color: 'red' },
  3: { name: 'Casa', color: 'red' },
  4: { name: 'Dificil', color: 'red' },
  5: { name: 'Duda', color: 'red' },
  6: { name: 'E', color: 'red' },
  7: { name: 'Gracias', color: 'red' },
  8: { name: 'Hola', color: 'red' },
  9: { name: 'Hospital', color: 'red' },
  10: { name: 'Hoy', color: 'red' },
  11: { name: 'I', color: 'red' },
  12: { name: 'Mujer', color: 'red' },
  13: { name: 'No', color: 'red' },
  14: { name: 'Uno', color: 'red' },
  15: { name: 'Dos', color: 'red' },
  16: { name: 'Tres', color: 'red' },
  17: { name: 'Cuatro', color: 'red' },
  18: { name: 'O', color: 'red' },
  19: { name: 'Papa', color: 'red' },
  20: { name: 'Policia', color: 'red' },
  21: { name: 'Si', color: 'red' },
  22: { name: 'Telefono', color: 'red' },
  23: { name: 'U', color: 'red' },
  24: { name: 'Universidad', color: 'red' }
};

type DrawRect = {
  boxes: number[][];
  classes: number[];
  scores: number[];
  threshold: number;
  imgWidth: number;
  imgHeight: number;
  canvasContext: CanvasRenderingContext2D;
};

export const drawRect = ({
  boxes,
  classes,
  scores,
  threshold,
  imgWidth,
  imgHeight,
  canvasContext
}: DrawRect) => {
  for (let i = 0; i <= boxes.length; i += 1) {
    if (boxes[i] && classes[i] && (scores[i] || 0) > threshold) {
      const [y, x, height, width] = boxes[i] as number[];
      const text = classes[i] as keyof typeof labelMap;

      if (canvasContext) {
        canvasContext.strokeStyle = labelMap[text].color;
        canvasContext.lineWidth = 10;
        canvasContext.fillStyle = 'white';
        canvasContext.font = '30px Arial';

        canvasContext.beginPath();
        canvasContext.fillText(
          `${labelMap[text].name} - ${
            Math.round((scores[i] || 1) * 100) / 100
          }`,
          (x || 0) * imgWidth,
          (y || 0) * imgHeight - 10
        );
        canvasContext.rect(
          (x || 0) * imgWidth,
          (y || 0) * imgHeight,
          ((width || 0) * imgWidth) / 2,
          ((height || 0) * imgHeight) / 1.5
        );
        canvasContext.stroke();
      }
    }
  }
};

export default drawRect;

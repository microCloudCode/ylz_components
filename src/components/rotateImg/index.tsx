import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';

const rotate = function (canvas: HTMLCanvasElement, img: HTMLImageElement, rot = 0) {
  //获取图片的高宽
  var w = img.width;
  var h = img.height;

  var rotation = Math.PI * rot / 180;
  var c = Math.round(Math.cos(rotation) * 1000) / 1000;
  var s = Math.round(Math.sin(rotation) * 1000) / 1000;
  //旋转后canvas标签的大小
  canvas.height = Math.abs(c * h) + Math.abs(s * w);
  canvas.width = Math.abs(c * w) + Math.abs(s * h);
  //绘图开始
  var context = canvas.getContext("2d");
  if (context === null) { return }
  context.save();
  //改变中心点
  if (rotation <= Math.PI / 2) {
    context.translate(s * h, 0);
  } else if (rotation <= Math.PI) {
    context.translate(canvas.width, -c * h);
  } else if (rotation <= 1.5 * Math.PI) {
    context.translate(-c * w, canvas.height);
  } else {
    context.translate(0, -s * w);
  }
  //旋转90°
  context.rotate(rotation);
  //绘制
  context.drawImage(img, 0, 0, w, h);
  context.restore();
  img.style.display = "none";
}

/**
 * 旋转图片
 */
interface Props {
  rot: number,
  src: string,
  imgClass: string
}
export default ({ rot, src, imgClass }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (canvasRef.current && imgRef.current) {
      rotate(canvasRef.current, imgRef.current, rot)
    }
  }, [rot])

  return (
    <div className={imgClass}>
      <canvas ref={canvasRef}></canvas>
      <img src={src} ref={imgRef} className={imgClass} />
    </div>
  );
}

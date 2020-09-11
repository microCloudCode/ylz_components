import React, { useEffect, useState } from 'react';
import styles from './index.less';


/**
 * 旋转图片
 */
interface Props {
  rot: number,
  src: string,
}

export default ({ rot, src }: Props) => {
  const [url, setUrl] = useState("")

  useEffect(() => {
    getSrc(src, rot).then(e => setUrl(e))
  }, [rot, src])

  return (
    <>
      <img src={url} className={styles.img} />
    </>
  );
}

// 获取src
const getSrc = (url: string, rot: number): Promise<string> => {
  return new Promise((res, rej) => {
    if (rot === 0) {//无需旋转，直接返回原url
      return res(url)
    }
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
    img.onload = function () {//图片加载完，再draw 和 toDataURL
      rotate(img, rot, res)
    };
    img.onerror = function () {
      rej()
    }
  })
}


// 旋转
const rotate = function (img: HTMLImageElement, rot = 0, res: (value?: string) => void) {
  const canvas = document.createElement("canvas")
  //获取图片的高宽
  let w = img.width;
  let h = img.height;

  let rotation = Math.PI * rot / 180;
  let c = Math.round(Math.cos(rotation) * 1000) / 1000;
  let s = Math.round(Math.sin(rotation) * 1000) / 1000;
  //旋转后canvas标签的大小
  canvas.height = Math.abs(c * h) + Math.abs(s * w);
  canvas.width = Math.abs(c * w) + Math.abs(s * h);
  //绘图开始
  let context = canvas.getContext("2d");
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
  //旋转
  context.rotate(rotation);
  //绘制图片
  context.drawImage(img, 0, 0, w, h);
  //获取Blob对象
  canvas.toBlob((blob) => {
    res(URL.createObjectURL(blob))
  })
}



import React from 'react';
import { useFetch } from '../dhooks';

var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
  'https://www.kkkk1000.com/images/wxQrCode2.png',
  'https://jicvps.qingguo.com/crm/www/i/index_banner1.jpg',
  'https://www.kkkk1000.com/images/getImgData/Particle.gif',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
  'https://www.kkkk1000.com/images/wxQrCode2.png',
];

// fecth 需要根据业务需求实现
function loadImg(url, i) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('一张图片加载完成', url, i);
      resolve({
        url, i
      });
    };
    img.onerror = reject;
    img.src = url;
  });
}

export const useFetchDemo = () => {

  const [res] = useFetch(loadImg, urls, 2);
  
  return (
    <div>
      <p>加载列表：</p>
      {
        res.map((item) => <p key = {item.i}>{item.url}{item.i}</p>)
      }
    </div>
  );
};
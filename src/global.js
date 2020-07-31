import React from 'react';
import { prodHostArr } from '@/utils/consts';

window.React = React;

if ('serviceWorker' in navigator) {
  // unregister service worker
  const { serviceWorker } = navigator;
  if (serviceWorker.getRegistrations) {
    serviceWorker.getRegistrations().then(sws => {
      sws.forEach(sw => {
        sw.unregister();
      });
    });
  }
  serviceWorker.getRegistration().then(sw => {
    if (sw) sw.unregister();
  });

  // remove all caches
  if (window.caches && window.caches.keys) {
    caches.keys().then(keys => {
      keys.forEach(key => {
        caches.delete(key);
      });
    });
  }
}

//判断是否是生产
let url = window.location.href;
let isProd = false;
for (let i = 0; i < prodHostArr.length; i++) {
  if (url.indexOf(prodHostArr[i]) > -1) {
    isProd = true;
    break;
  }
}
window.isProd = isProd;

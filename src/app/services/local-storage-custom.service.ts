import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCustomService {

  constructor() { }

  setWithExpiry(key: string, value: string, ttl: number) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl, // Calculate expiry time
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  getWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);
    if (itemStr == null || itemStr == 'NaN') {
      return null;
    }
    const item = JSON.parse(itemStr?.toString() || '');
    const now = new Date();
    console.log(now.getTime())
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key); // Remove item if expired
      return null;
    }
    return item.value;
  }



}

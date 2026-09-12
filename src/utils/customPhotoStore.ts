import { useState, useEffect } from 'react';

// Default photorealistic assets matching uploaded pictures
import defaultCarCake from '../assets/images/real_car_cake_1789234029966.jpg';
import defaultSonicCake from '../assets/images/sonic_dino_cake_1789234049604.jpg';
import defaultRateCard from '../assets/images/ayesha_rate_card_1789234071401.jpg';

export interface BakeryPhotos {
  carCake: string;
  sonicCake: string;
  rateCard: string;
}

const STORAGE_KEYS = {
  carCake: 'ayesha_bake_photo_car',
  sonicCake: 'ayesha_bake_photo_sonic',
  rateCard: 'ayesha_bake_photo_rate_card',
};

export const getStoredPhotos = (): BakeryPhotos => {
  if (typeof window === 'undefined') {
    return {
      carCake: defaultCarCake,
      sonicCake: defaultSonicCake,
      rateCard: defaultRateCard,
    };
  }

  return {
    carCake: localStorage.getItem(STORAGE_KEYS.carCake) || defaultCarCake,
    sonicCake: localStorage.getItem(STORAGE_KEYS.sonicCake) || defaultSonicCake,
    rateCard: localStorage.getItem(STORAGE_KEYS.rateCard) || defaultRateCard,
  };
};

export const saveCustomPhoto = (key: keyof BakeryPhotos, dataUrl: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS[key], dataUrl);
  window.dispatchEvent(new Event('ayesha_photos_updated'));
};

export const resetCustomPhotos = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.carCake);
  localStorage.removeItem(STORAGE_KEYS.sonicCake);
  localStorage.removeItem(STORAGE_KEYS.rateCard);
  window.dispatchEvent(new Event('ayesha_photos_updated'));
};

export const useCustomPhotos = () => {
  const [photos, setPhotos] = useState<BakeryPhotos>(getStoredPhotos);

  useEffect(() => {
    const handleUpdate = () => {
      setPhotos(getStoredPhotos());
    };

    window.addEventListener('ayesha_photos_updated', handleUpdate);
    return () => {
      window.removeEventListener('ayesha_photos_updated', handleUpdate);
    };
  }, []);

  return {
    photos,
    saveCustomPhoto,
    resetCustomPhotos,
    isCustomized:
      typeof window !== 'undefined' &&
      (Boolean(localStorage.getItem(STORAGE_KEYS.carCake)) ||
        Boolean(localStorage.getItem(STORAGE_KEYS.sonicCake)) ||
        Boolean(localStorage.getItem(STORAGE_KEYS.rateCard))),
  };
};

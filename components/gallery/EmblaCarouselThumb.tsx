import React from 'react';
import styles from '@styles/embla.module.css';
import Image from 'next/image';

export const Thumb = ({ selected, onClick, imgSrc }: any) => (
  <div
    className={`${styles.sembla__slide} ${styles.embla__slideThumb} ${
      selected ? styles.isSelected : ''
    }`}
  >
    <button
      onClick={onClick}
      className={`${styles.embla__slide__inner} ${styles.embla__slide__innerThumb}`}
      type="button"
    >
      {/* <img
        className={styles.embla__slide__thumbnail}
        src={imgSrc}
        alt="image"
      /> */}

      <Image
        className={styles.embla__slide__thumbnail}
        src={imgSrc}
        alt="thumbnail"
        fill
        placeholder="blur"
        blurDataURL={imgSrc}
      />
    </button>
  </div>
);

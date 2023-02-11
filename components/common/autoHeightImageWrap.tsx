import Image from 'next/image';
import styles from '@styles/Layout.module.css';
import { CSSProperties } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  style: CSSProperties;
}

export default function AutoHeightImageWrap({
  ...props
}: ImageProps): React.ReactElement {
  return (
    <div
      className={styles.autoHeightImageWrap}
      style={{ width: '100%', position: 'relative' }}
    >
      <Image fill className={styles.autoImage} {...props} />
    </div>
  );
}

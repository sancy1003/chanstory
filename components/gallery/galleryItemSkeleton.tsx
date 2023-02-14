import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GalleryItemSkeleton = () => {
  return (
    <div style={{ marginBottom: 50 }}>
      <Skeleton style={{ marginBottom: 16 }} height={350} />
      <Skeleton style={{ marginBottom: '10px' }} height={24} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Skeleton width={50} height={24} />
        <Skeleton width={100} height={24} />
      </div>
    </div>
  );
};

export default GalleryItemSkeleton;

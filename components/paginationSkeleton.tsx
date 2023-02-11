import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  width: number;
  marginTop: number;
  height: number;
}

export default function PaginationSkeleton({
  width,
  marginTop,
  height,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Skeleton width={width} height={height} style={{ marginTop }} />
    </div>
  );
}

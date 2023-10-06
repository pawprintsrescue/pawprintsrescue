import clsx from 'clsx';

export const AnimalImageSkeleton = ({ className }: { className?: string }) => {
  return <div className={clsx('animate-pulse bg-gray-200', className)}></div>;
};

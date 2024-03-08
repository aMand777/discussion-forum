/* eslint-disable react/no-array-index-key */
type SkeletonListProps = {
  loop: number;
};

function SkeletonList({ loop }: SkeletonListProps) {
  const looping = new Array(loop).fill(null);
  return (
    <>
      {looping.map((_, index) => (
        <div key={index} className="flex flex-col gap-4 w-full">
          <div className="flex gap-4 items-center">
            <div className="skeleton w-10 h-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-56" />
            </div>
          </div>
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="flex gap-5">
            <div className="skeleton h-7 w-7" />
            <div className="skeleton h-7 w-7" />
            <div className="skeleton h-7 w-7" />
          </div>
          <div className="divider" />
        </div>
      ))}
    </>
  );
}

export default SkeletonList;

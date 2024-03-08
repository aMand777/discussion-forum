/* eslint-disable react/no-array-index-key */
type CardLeaderBoardSkeletonProps = {
  loop: number;
};

function CardLeaderBoardSkeleton({ loop }: CardLeaderBoardSkeletonProps) {
  const looping = new Array(loop).fill(null);
  return (
    <>
      {looping.map((_, index) => (
        <div
          key={index}
          className="mb-16 shadow-xl lg:mb-5 card card-side bg-base-100"
        >
          <div className="flex flex-col items-center card-body md:flex-row">
            <div className="avatar">
              <div className="w-32 lg:w-40 mask mask-hexagon">
                <div className="skeleton w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="skeleton w-1/3 h-4 mb-5" />
              <div className="skeleton w-1/2 h-4" />
            </div>
          </div>
          <div className="justify-end card-actions">
            <div className="skeleton w-16 h-20" />
          </div>
        </div>
      ))}
    </>
  );
}

export default CardLeaderBoardSkeleton;

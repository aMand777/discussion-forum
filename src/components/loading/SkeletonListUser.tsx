/* eslint-disable react/no-array-index-key */

type SkeletonListUserProps = {
  loop: number;
};

function SkeletonListUser({ loop }: SkeletonListUserProps) {
  const looping = new Array(loop).fill(null);
  return (
    <>
      {looping.map((_, index) => (
        <div key={index} className="flex items-center justify-between my-5">
          <div className="avatar">
            <div className="skeleton w-12 h-12 rounded-full shrink-0" />
          </div>
          <div className="skeleton h-5 w-32" />
          <div className="skeleton h-12 w-20" />
        </div>
      ))}
    </>
  );
}

export default SkeletonListUser;

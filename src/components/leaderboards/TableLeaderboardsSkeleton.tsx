/* eslint-disable react/no-array-index-key */

type TableLeaderBoardsSkeletonProps = {
  loop: number;
};

function TableLeaderBoardsSkeleton({ loop }: TableLeaderBoardsSkeletonProps) {
  const looping = new Array(loop).fill(null);
  return (
    <>
      {looping.map((_, index) => (
        <tbody key={index}>
          <tr>
            <th>{index + 1}</th>
            <td
              className="flex items-center gap-3"
              aria-label="User Information"
            >
              <div className="avatar">
                <div className="skeleton w-10 h-10 rounded-full shrink-0" />
              </div>
              <div className="skeleton h-4 w-28" />
            </td>
            <th aria-label="User Information">
              <div className="skeleton h-4 w-8" />
            </th>
          </tr>
        </tbody>
      ))}
    </>
  );
}

export default TableLeaderBoardsSkeleton;

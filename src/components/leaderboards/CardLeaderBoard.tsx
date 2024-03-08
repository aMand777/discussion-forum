import { Link } from 'react-router-dom';
import Score from './Score.tsx';
import useUser from '../../hook/useUser.ts';

type CardLeaderBoardProps = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  score: number;
};

function CardLeaderBoard({
  id,
  name,
  email,
  avatar,
  score,
}: CardLeaderBoardProps) {
  const { authUser } = useUser();
  return (
    <Link
      to={`/${name}/${id}/profile`}
      className="mb-16 shadow-xl bg-base-100 lg:mb-5 card card-side"
    >
      <div className="flex flex-col items-center card-body md:flex-row">
        <div className="avatar">
          <div className="w-32 lg:w-40 mask mask-hexagon">
            <img src={avatar} alt={`avatar/${name}`} />
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          {/* <h2 className="card-title line-clamp-1">{name}</h2> */}
          <span className="card-title line-clamp-1">
            {name}
            {id === authUser.id && <span className="ml-1">(You)</span>}
          </span>
          <p className="line-clamp-1">{email}</p>
        </div>
      </div>
      <div className="absolute right-0 card-actions">
        <Score score={score} />
      </div>
    </Link>
  );
}

export default CardLeaderBoard;

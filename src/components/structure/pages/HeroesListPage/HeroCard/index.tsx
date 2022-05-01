import React from 'react';
import { useNavigate } from 'react-router';
import IconButton from '../../../../reusable/IconButton';

const HeroCard: React.FC<{
  name: string;
  imageLink: string;
  id?: string;
  isRequesting?: boolean;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ name, imageLink, id, onDelete, isRequesting }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-80 w-56 flex-col gap-2 rounded bg-stone-100 py-2 px-4">
      <div className="mb-auto">
        <h3 className="block break-words font-bangers text-2xl">{name}</h3>
        <div className="h-1 w-full bg-red-700 " />
      </div>
      <img
        src={imageLink}
        alt=""
        className="mx-auto max-h-full max-w-full overflow-hidden rounded object-cover"
      />
      <div className="mt-auto">
        <div className="h-1 w-full bg-red-700" />
        <div className="mt-1 flex">
          <IconButton
            className="mr-auto"
            disabled={isRequesting}
            onClick={() => navigate(`/heroes/edit/${id}`)}
          >
            Edit
          </IconButton>
          <IconButton
            className="mx-auto"
            onClick={onDelete}
            disabled={isRequesting}
          >
            X
          </IconButton>
          <IconButton
            className="ml-auto"
            disabled={isRequesting}
            onClick={() => navigate(`/heroes/${id}`)}
          >
            Info
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;

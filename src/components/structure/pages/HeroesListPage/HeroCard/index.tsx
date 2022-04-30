import React, { useState } from 'react';
import { Navigate } from 'react-router';
import IconButton from '../../../../reusable/IconButton';

const HeroCard: React.FC<{
  name: string;
  imageLink: string;
  id?: string;
  isRequesting?: boolean;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ name, imageLink, id, onDelete, isRequesting }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [info, setInfo] = useState<boolean>(false);
  return (
    <div className="flex h-80 w-56 flex-col gap-2 rounded border-red-700 bg-slate-100 py-1 px-4">
      {edit && <Navigate to={`/heroes/edit/${id}`} />}
      {info && <Navigate to={`/heroes/${id}`} />}
      <div className="mb-auto">
        <h3 className="block break-words font-bangers text-2xl">{name}</h3>
        <div className="h-1 w-full bg-red-700" />
      </div>
      <img
        src={imageLink}
        alt=""
        className="mx-auto max-h-full max-w-full overflow-hidden rounded object-cover"
      />
      <div className="mt-auto">
        <div className="h-1 w-full bg-red-700" />
        <div className="flex">
          <IconButton
            className="mr-auto"
            disabled={isRequesting}
            onClick={() => setEdit(true)}
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
            onClick={() => setInfo(true)}
          >
            Info
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;

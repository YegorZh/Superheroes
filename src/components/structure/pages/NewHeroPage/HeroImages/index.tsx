import React from 'react';
import IconButton from '../../../../reusable/IconButton';

const HeroImages: React.FC<{
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  ref?: React.RefObject<HTMLDivElement>;
}> = ({ images, setImages }) => {
  const moveImageLeft = (array: string[], i: number) => {
    if (i <= 0)
      throw new Error("Can't move array item left when it's at position <= 0.");
    const arr = [...array];
    const previousIndex = i - 1;
    [arr[previousIndex], arr[i]] = [arr[i], arr[previousIndex]];
    return arr;
  };

  const moveImageRight = (array: string[], i: number) => {
    if (i >= array.length - 1)
      throw new Error(
        "Can't move array item left when it's at position >= array.last - 1."
      );
    const arr = [...array];
    const nextIndex = i + 1;
    [arr[i], arr[nextIndex]] = [arr[nextIndex], arr[i]];
    return arr;
  };

  const size = 'h-64 max-w-[300px]';

  return (
    <div className="scrollbar flex snap-x gap-4 overflow-y-auto">
      {images.map((image, i) => (
        <div key={i}>
          <div className="flex justify-between">
            <IconButton
              disabled={i === 0}
              onClick={() =>
                setImages((oldImages) => moveImageLeft(oldImages, i))
              }
            >
              {'<<'}
            </IconButton>
            <IconButton
              onClick={() =>
                setImages((oldImages) => {
                  const out = [...oldImages];
                  out.splice(i, 1);
                  return out;
                })
              }
            >
              X
            </IconButton>
            <IconButton
              disabled={i === images.length - 1}
              onClick={() =>
                setImages((oldImages) => moveImageRight(oldImages, i))
              }
            >
              {'>>'}
            </IconButton>
          </div>
          <img
            src={image}
            alt={`Hero ${i}`}
            className={`mt-2 snap-center rounded object-fill ${size}`}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroImages;

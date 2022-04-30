import React, { useEffect, useRef } from 'react';
import { Hero } from '..';
import IconButton from '../../../../reusable/IconButton';

const HeroImages: React.FC<{
  images: string[];
  setNewHero: React.Dispatch<React.SetStateAction<Hero>>;
  ref?: React.RefObject<HTMLDivElement>;
  scrollToEnd?: boolean;
}> = ({ images, setNewHero, scrollToEnd }) => {
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
  const ref = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<ParentNode | null | undefined>(null);
  const sideRef = useRef<{ right: boolean } | null>(null);

  useEffect(() => {
    if (scrollToEnd) {
      ref.current?.scrollTo({
        left: ref.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [scrollToEnd]);

  useEffect(() => {
    if (imgRef?.current && ref?.current) {
      let sibling = (imgRef.current as HTMLElement).previousSibling;
      if (sideRef.current?.right)
        sibling = (imgRef.current as HTMLElement).nextSibling;
      if (sibling) {
        (sibling as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }
  }, [sideRef.current]);
  return (
    <div ref={ref} className="scrollbar flex gap-4 overflow-y-auto">
      {images.map((image, i) => (
        <div key={i}>
          <div className="flex justify-between">
            <IconButton
              disabled={i === 0}
              onClick={(event) => {
                setNewHero((oldHero) => ({
                  ...oldHero,
                  images: moveImageLeft(oldHero.images, i),
                }));
                imgRef.current = (
                  event.target as HTMLButtonElement
                ).parentNode?.parentNode;
                sideRef.current = { right: false };
              }}
            >
              {'<<'}
            </IconButton>
            <IconButton
              onClick={() => {
                setNewHero((oldHero) => {
                  const newHero = { ...oldHero };
                  newHero.images.splice(i, 1);
                  return newHero;
                });
              }}
            >
              X
            </IconButton>
            <IconButton
              disabled={i === images.length - 1}
              onClick={(event) => {
                setNewHero((oldHero) => ({
                  ...oldHero,
                  images: moveImageRight(oldHero.images, i),
                }));
                imgRef.current = (
                  event.target as HTMLButtonElement
                ).parentNode?.parentNode;
                sideRef.current = { right: true };
              }}
            >
              {'>>'}
            </IconButton>
          </div>
          <img
            src={image}
            alt={`Hero ${i}`}
            className={`mt-2 rounded object-fill ${size}`}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroImages;

const validateImageLink = (image: string) => {
  const imageLinkRegExp = new RegExp(
    /^(https?:\/\/.*\.(?:png|jpe?g|gif|svg|webp))$/,
    'i'
  );
  if (!image) return 'You must specify image link before adding an image';
  else if (!imageLinkRegExp.test(image))
    return 'Image link must end in .png, .jpeg, .jpg, .gif, .svg or .webp';
  return false;
};

const validateImages = (images: string[]) => {
  if (images.length < 1) return 'You must add at least one image';
  return false;
};

const validateNickname = (nickname: string) => {
  if (!nickname) return 'Nickname is required';
};

export { validateImageLink, validateImages, validateNickname };

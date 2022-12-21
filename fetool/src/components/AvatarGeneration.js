// **************Functions to generate Avatar***********

//To generate the letters in Avatar
const stringAvatar = (name) => {
  const length = Math.round(name.length / 2);
  let avatarName = name[0] + name.toUpperCase()[length];

  if (name.indexOf(" ") >= 0) {
    const newName = name.split(" ");
    avatarName = newName[0][0] + newName[1][0];
  }
  return avatarName;
};

//Auto generate unique avatar colour
const getHashOfString = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};

const normalizeHash = (hash, min, max) => {
  return Math.floor((hash % (max - min)) + min);
};

const hRange = [0, 360];
const sRange = [30, 50];
const lRange = [80, 90];

const generateHSL = (name) => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0], sRange[1]);
  const l = normalizeHash(hash, lRange[0], lRange[1]);
  return [h, s, l];
};

const generateHSLForColor = (name) => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0] + 60, sRange[1] + 50);
  const l = normalizeHash(hash, lRange[0] - 70, lRange[1] - 70);
  return [h, s, l];
};

const HSLtoString = (hsl) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

export { HSLtoString, generateHSL, generateHSLForColor, stringAvatar };

import React from 'react'
import UiAvatar from './UiAvatar';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function UiAvatarFromName(props) {

  const name = props.children
  const ArrayFromName = name.toUpperCase().split(' ')
  let letters = ArrayFromName[0][0]
  letters += ArrayFromName.length > 0 ? ArrayFromName[1][0] : '';
     
  return (
      <UiAvatar sx={{ bgcolor: stringToColor(name)}}>
        {letters}
      </UiAvatar>
  );
}



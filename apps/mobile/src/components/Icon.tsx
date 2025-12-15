import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';

export const Icon: React.FC<IconProps> = (props) => {
  return <Ionicons {...props} />;
};

import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../constants/theme';

const SafeScreen = ({ children, style = {}, className = '' }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 ${className}`}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: COLORS.background,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;

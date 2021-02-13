import * as React from 'react';
import { Text } from 'react-native';
console.disableYellowBox = true;

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

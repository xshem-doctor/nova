// components/ArabicText.tsx
import { Text, TextProps } from 'react-native';

export default function ArabicText(props: TextProps) {
  return <Text {...props} style={[{ fontFamily: 'Cairo' }, props.style]} />;
}

// components/InfoBox.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import ArabicText from './ArabicText';

interface InfoBoxProps {
  lines: string[];
  title?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ lines, title }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.box}>
        {title && (
          <ArabicText style={styles.title}>
            {title}
          </ArabicText>
        )}
        {lines.map((line, index) => (
          <ArabicText key={index} style={styles.line}>
            {index + 1}. {line}
          </ArabicText>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 12,
    elevation: 4,
  },
  box: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'right',
  },
  line: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'right',
    color: '#fff',
    fontWeight: '500',
  },
});

export default InfoBox;

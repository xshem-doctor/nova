import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

interface InvestmentBoxProps {
  title: string;
  text1: string;
  text2: string;
  text3: string;
}

const InvestmentBox: React.FC<InvestmentBoxProps> = ({ title, text1, text2, text3 }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonRow}>
        <View>
            <Text>{text1}</Text>
            <Text>{text2}</Text>
            <Text>{text3}</Text>
        </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    elevation: 4,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#6200ee",
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: 'bold',
    textAlign: 'right', // Arabic-friendly
  },

  buttonRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default InvestmentBox;

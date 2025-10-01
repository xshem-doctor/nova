import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tiers = [
  { name: 'فضي', min: 10, max: 100, rate: 0.20 },
  { name: 'ذهبي', min: 101, max: 1000, rate: 0.25 },
  { name: 'بلاتين', min: 1001, max: 10000, rate: 0.30 },
  { name: 'ألماسي', min: 10001, max: 100000, rate: 0.50 },
];

export default function StakingCalculator() {
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('');
  const [investmentData, setInvestmentData] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('Token').then((t) => {
      if (t) setToken(t);
    });
  }, []);

  const parsedAmount = parseFloat(amount);
  const tier = !isNaN(parsedAmount) ? tiers.find(t => parsedAmount >= t.min && parsedAmount <= t.max) : null;
  const dailyProfit = tier ? (parsedAmount * tier.rate).toFixed(2) : '—';

  const handleInvestNow = async () => {
    if (!tier) {
      Alert.alert('❌ خطأ', 'أدخل مبلغ صالح للاستثمار (أعلى من 10)');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/invest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parsedAmount }),
      });

      const data = await res.json();
      if (data.success) {
        setInvestmentData(data);
        Alert.alert('✅ تم الاستثمار', `الربح اليومي: ${data.daily_reward} دولار`);
      } else {
        Alert.alert('❌ خطأ', data.message || data.error);
      }
    } catch (err) {
      Alert.alert('❌ فشل الاتصال', 'تحقق من الشبكة أو حاول لاحقاً');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <TextInput
          label="💰 أدخل مبلغ الاستثمار"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        <Text style={styles.result}>المستوى: {tier ? tier.name : '—'}</Text>
        <Text style={styles.result}>الفائدة: {tier ? `${tier.rate * 100}%` : '—'}</Text>
        <Text style={styles.result}>الربح اليومي: {dailyProfit} دولار</Text>

        <Button
          mode="contained"
          icon="cash-lock"
          onPress={handleInvestNow}
          style={styles.button}
        >
          استثمر الآن
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    elevation: 3,
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
  },
  result: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 4,
    color: '#6750A4',
  },
  button: {
    marginTop: 16,
  },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorDialog from './ErrorDialog';
import { useUser } from './UserContext';

const tiers = [
  { name: 'فضي', min: 10, max: 100, rate: 0.20 },
  { name: 'ذهبي', min: 101, max: 1000, rate: 0.25 },
  { name: 'بلاتين', min: 1001, max: 10000, rate: 0.30 },
  { name: 'ألماسي', min: 10001, max: 100000, rate: 0.50 },
];

export default function StakingCalculator() {
  const { user, loading } = useUser();
  
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const showError = (msg: string) => {
        setErrorMessage(msg);
        setErrorVisible(true);
  };



  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('');
  const [investmentData, setInvestmentData] = useState(null);

    useEffect(() => {
      const loadToken = async () => {
        const t = await AsyncStorage.getItem('Token');
        if (t) setToken(t);
      };
      loadToken();
    }, []);


  const parsedAmount = parseFloat(amount);
  const tier = !isNaN(parsedAmount) ? tiers.find(t => parsedAmount >= t.min && parsedAmount <= t.max) : null;
  const dailyProfit = tier ? (parsedAmount * tier.rate).toFixed(2) : '—';

  const handleInvestNow = async () => {
    if (!tier) {
      showError('❌ خطأ'+ 'أدخل مبلغ صالح للاستثمار (أعلى من 10)');
      return;
    }
    const balance = parseFloat(user?.balance || '0');
    if (balance < 10) {
      showError('❌ خطأ'+ 'رصيدك غير كافي (تحتاج إيداع)');
      return;
    }

    try {
      const res = await fetch('https://novaplatform.pythonanywhere.com/api/invest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parsedAmount }),
      });

      const data = await res.json();
      if (data.rank) {
        setInvestmentData(data);
        showError(' المعاملة تمت يمكنك متابعة الاستثمار داخل الملف الشخصي' + ` يمكنك السحب بتاريخ  ${data.locked_until} \n ${data.daily_reward} الربح اليومي`);
      } else {
        showError('❌ خطأ' + data.message || data.error);
      }
    } catch (err) {
      showError('❌ فشل الاتصال' + 'تحقق من الشبكة أو حاول لاحقاً');
    }
  };

  return (
    <Card style={styles.card}>
      <ErrorDialog
            visible={errorVisible}
            message={errorMessage}
            onDismiss={() => setErrorVisible(false)}
          />
      <Card.Content>
        <TextInput
          label=" أدخل مبلغ الاستثمار"
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
          onPress={() => handleInvestNow()}
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
    color: '#6200ee',
  },
  button: {
    marginTop: 16,
  },
});

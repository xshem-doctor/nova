import ArabicText from '@/components/ArabicText';
import Clipboard from '@react-native-clipboard/clipboard';
import * as React from 'react';
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, RadioButton } from 'react-native-paper';
import { useUser } from '@/components/UserContext';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CashIn() {

  const handleValidateDeposit = async () => {
  const token = await AsyncStorage.getItem('Token'); // or however you store JWT
  const response = await fetch('http://127.0.0.1:8000/api/validate-deposit/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const data = await response.json();

  if (response.ok) {
    if (data.txid) {
      Alert.alert('🎉 تم إرسال المكافأة', `تم إرسال ${data.reward} USDT إلى المُحيل`);
    } else {
      Alert.alert('✅ تم التحقق', data.message || 'أنت الآن VIP');
    }
  } else {
    Alert.alert('❌ خطأ', data.error || data.message || 'فشل التحقق');
  }
};


  const [value, setValue] = React.useState('first');
  const { user, loading } = useUser();
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ArabicText style={styles.loadingText}>جاري تحميل البيانات...</ArabicText>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ArabicText style={styles.loadingText}>تعذر تحميل بيانات المستخدم</ArabicText>
        <Button onPress={() => router.replace('/(auth)/login')}>إعادة تسجيل الدخول</Button>
      </View>
    );
  }
  const getMessage = () => {
    switch (value) {
      case 'TRX':
        return user.wallet;
      case 'USDT':
        return user.wallet;
      default:
        return 'الرجاء اختيار نوع الإيداع';
    }
  };

  const handleCopy = () => {
    const address = getMessage();
    if (address && !address.startsWith('الرجاء')) {
      Clipboard.setString(address);
    }
  };

   const lines = [
    'عنوان الإيداع أعلاه هو عنوان محفظتك على المنصة ستكون مسؤول عن فقدان الأموال في حال الإيداع الخطأ عليها', 
    'الرجاء تحديد نوع العملة التي تريد الإيداع من خلالها ثم تحويل المبلغ المراد إيداعه على العنوان الظاهر', 
    ' لا تقم بتحويل أي أصول أخرى سوى الذي تم اختياره وإلا فإن عملية الاسترجاع ستأخذ وقتاً طويلاً'  , 
    ];

  return (
    <>
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content title="المحفظة" style={{ justifyContent: "center", alignItems: "center" }} />
      </Appbar.Header>

      <View style={styles.container}>
        <RadioButton.Group onValueChange={setValue} value={value}>
          <RadioButton.Item label="TRX" value="TRX" />
          <RadioButton.Item label="USDT" value="USDT" />
        </RadioButton.Group>

        <ArabicText style={styles.message}>{getMessage()}</ArabicText>
        
        <View style={styles.buttonRow}>
        <Button
        mode="contained"
          onPress={handleCopy}
          style={styles.copyButton}
        >
          نسخ العنوان
        </Button>

        <Button mode="outlined" onPress={handleValidateDeposit}>
          تأكيد الإيداع
        </Button>
        </View>
      </View>

      <Card style={styles.card}>
      <View style={styles.box}>
        {lines.map((line, index) => (
          <ArabicText key={index} style={styles.line}>
            {index + 1}. {line}
          </ArabicText>
        ))}
      </View>
    </Card>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Cairo',
    color: '#666',
  },

  container: {
    padding: 20,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  copyButton: {
    marginTop: 10,
    alignSelf: 'center',
  },

  card: {
    margin: 20,
    padding: 10,
  },
  box: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
  },
  line: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'right', // for Arabic alignment
  },

   buttonRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 20,
  },

});

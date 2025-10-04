import ArabicText from '@/components/ArabicText';
import ErrorDialog from '@/components/ErrorDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, TextInput } from 'react-native-paper';
import { useUser } from '@/components/UserContext';

export default function CashOut() {
  const [amount, setAmount] = React.useState('');
  const [toAddress, setToAddress] = React.useState('');

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { user, loading } = useUser();
    const showError = (msg: string) => {
      setErrorMessage(msg);
      setErrorVisible(true);
    };


  const handleWithdraw = async () => {
    console.log('Withdraw amount:', amount);
    if (parseFloat(amount) < 1 || amount.length == 0 ) {
      showError(`الرجاء تحديد مبلغ السحب`);
      return
    }

    if (parseFloat(amount) > parseFloat(user?.referral_reward_total || '0')) {
      showError(`لا تملك هذه الأرباح تأكد من وقت انتهاء الاستثمار, أرباحك الأن ` + `${user?.referral_reward_total}`);
      return
    }

    if (toAddress.length == 0 || !toAddress.startsWith("T") && toAddress.length == 34 ) {
      showError(`الرجاء ادخال عنوان صحيح`);
      return
    }

    try {
    const token = await AsyncStorage.getItem('Token'); // or however you store JWT
    const response = await fetch('https://novaplatform.pythonanywhere.com/api/withdraw-referral/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // replace with actual token
      },

      body: JSON.stringify({
        amount: parseFloat(amount),
        to: toAddress,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      showError(`تم إرسال ${data.amount} TRX بنجاح الرحاء الانتظار بعض الوقت للموافقة. معرف المعاملة: ${data.to_address}`);
    } else {
      showError(`خطأ: ${data.error}`);
    }
  } catch (error) {
    showError('فشل الاتصال بالخادم');
  }
  };

  const lines = [
    ' يرجى الملاحظة عند تقديم طلب السحب سيأخذ بعض الوقت في المعالجة وستكون عملية السحب في تقدم وهذا لا يعني أنك فقدت أصولك أو حدث خطأ تقني يرجى الانتظار 24  ساعة قبل التواصل مع الدعم', 
    'في حال لم يتم السحب بعد 24 ساعة الرجاء التواصل مع خدمة العملاء المتوجده على مدار الساعة فوراً ولا تنتظر لعده أيام', 
    ' العملات الرقمية بطبيعتها تحتاج إلى رسوم معاملة حتى تتم عملية نقل الأموال وصول الملغ إليك أقل بعدة دولارات لا يعني وجود خطأ بل فقط خصم رسوم المعاملة '  , 
    ];

  return (
      <>
    <ErrorDialog
          visible={errorVisible}
          message={errorMessage}
          onDismiss={() => setErrorVisible(false)}
        />
      <ScrollView>
      <Appbar.Header>
          <Appbar.Content title="المحفظة" style={{ justifyContent: "center", alignItems: "center" }} />
      </Appbar.Header>
      
      
      <View style={styles.container}>
              <TextInput
                  label="المبلغ المراد سحبه"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  mode="outlined"
                  style={styles.input}
                  textAlign="right" />

              <TextInput
                  label="عنوان السحب"
                  value={toAddress}
                  onChangeText={setToAddress}
                  mode="outlined"
                  style={styles.input}
                  textAlign="right"
                />

              <Button mode="contained" onPress={handleWithdraw} style={styles.button}>
                  تأكيد السحب
              </Button>
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
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
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
});

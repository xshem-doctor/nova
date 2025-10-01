import ArabicText from '@/components/ArabicText';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, TextInput } from 'react-native-paper';

export default function CashOut() {
  const [amount, setAmount] = React.useState('');

  const handleWithdraw = () => {
    console.log('Withdraw amount:', amount);
    // Add your withdrawal logic here
  };

  const lines = [
    ' يرجى الملاحظة عند تقديم طلب السحب سيأخذ بعض الوقت في المعالجة وستكون عملية السحب في تقدم وهذا لا يعني أنك فقدت أصولك أو حدث خطأ تقني يرجى الانتظار 24  ساعة قبل التواصل مع الدعم', 
    'في حال لم يتم السحب بعد 24 ساعة الرجاء التواصل مع خدمة العملاء المتوجده على مدار الساعة فوراً ولا تنتظر لعده أيام', 
    ' العملات الرقمية بطبيعتها تحتاج إلى رسوم معاملة حتى تتم عملية نقل الأموال وصول الملغ إليك أقل بعدة دولارات لا يعني وجود خطأ بل فقط خصم رسوم المعاملة '  , 
    ];

  return (
      <>

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
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  mode="outlined"
                  style={styles.input}
                  textAlign="right" />
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

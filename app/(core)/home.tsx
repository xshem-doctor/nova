import InvestmentBox from '@/components/InvestBox';
import StakingCalculator from '@/components/StakingCalculator';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Button, Card, Text } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useUser } from '@/components/UserContext';
import ErrorDialog from '@/components/ErrorDialog';
import { Linking } from 'react-native';
import AppHeader from '@/components/AppHeader';
import InfoBox from '@/components/InfoBox';
import FabMenu from '@/components/FabMenu';


export default function Home() {
  const { user, loading } = useUser();
  const [referralUrl, setReferralUrl] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    if (user?.referral_code) {
      Linking.getInitialURL().then((url) => {
        const baseUrl = window.location.origin;
        const fullReferral = `${baseUrl}/signup?ref=${user.referral_code}`;
        setReferralUrl(fullReferral);
      });
    }
  }, [user]);

useEffect(() => {
   console.log('Injecting Respond.io widget...');
    const script = document.createElement('script');
    script.src = 'https://cdn.respond.io/webchat/widget/widget.js?cId=0381bcfa4001fb32d107b4a68a9e3ac';
    script.id = 'respondio__widget';
    document.body.appendChild(script);
}, []);


     const showError = (msg: string) => {
       setErrorMessage(msg);
       setErrorVisible(true);
     };
     


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} />
        <Text style={styles.loadingText}>جاري تحميل البيانات...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>تعذر تحميل بيانات المستخدم</Text>
        <Button onPress={() => router.replace('/(auth)/login')}>إعادة تسجيل الدخول</Button>
      </View>
    );
  }



    const lines = [
    'كل ثلاث مستثمرين بملغ 100$  عن طريق رابط الإحالة الخاص بك جائزة 100$' ,
    ' كل خمس مستثمرين بملغ 100$  عن طريق رابط الإحالة الخاص بك جائزة 200$ ',
    ' كل عشرة مستثمرين 100$  عن طريق رابط الإحالة الخاص بك جائزة 500$ ',
    ' ملاحظة : نظام المكافأت يبدأ من 1/10 وينتهي 20/10 ',
    'THE NOVA IS THE BEST⚡⚡⚡',

    ];

  return (
    <ScrollView>
      <AppHeader user={user} />
      <FabMenu
      position="bottom-left"
      actions={[
        { icon: 'robot-confused-outline', label: 'الدعم وخدمة العملاء', onPress: () => Linking.openURL('https://t.me/novacoinupBot'), },
        // { icon: 'star', label: 'Star', onPress: () => console.log('Star') },
      ]}
    />

      <ErrorDialog
                visible={errorVisible}
                message={errorMessage}
                onDismiss={() => setErrorVisible(false)}
              />
      <Card style={styles.card}>

        <Card.Content>
          <Text style={styles.label}> الرصيد</Text>
          <Text style={styles.value}>{user.balance}</Text>
          <Text style={styles.msg}>{user?.investments?.length ? 'الرصيد مقفل حتى انتهاء الاستثمار' : ""}</Text>

          <Text style={styles.label}> عنوان المحفظة</Text>
          <Text style={styles.value}>{user.wallet.slice(0, 20) + "..."}</Text>

          <Text style={styles.label}> كود الإحالة</Text>
          <Text style={styles.value}>{user.referral_code}</Text>

          <View style={styles.buttonRow}>
            <Button
              mode="outlined"

              onPress={() => {
                Clipboard.setString(referralUrl);
               showError('تم نسخ العنوان إلى الحافظة');
              }}
              style={styles.button}
            >
              نسخ الإحالة
            </Button>

            <Button
              mode="contained"
              onPress={() => {
                Clipboard.setString(user.wallet);
                showError('تم نسخ العنوان إلى الحافظة');
              }}
              style={styles.button}
            >
              نسخ رابط المحفظة
            </Button>
          </View>
        </Card.Content>
      </Card>
      <StakingCalculator />

      <InfoBox title={' نظام الجوائز لمهام شهر أكتوبر '} lines={lines} />

      {/* Investment tiers */}
      <InvestmentBox
        title="💰 المستوى: فضي"
        text1="$ سعر الاستثمار:من 10 الى 100"
        text2="📈 سعر الفائدة بالمئة: 20"
        text3="💵 الربح: 2 - 20 دولار"
      />
      <InvestmentBox
        title="💰 المستوى: الذهبي"
        text1="$ سعر الاستثمار: من 101 إلى 1000"
        text2=" سعر الفائدة بالمئة: 25 "
        text3="💵 الربح: 25 - 250 دولار"
      />
      <InvestmentBox
        title="💰 المستوى: بلاتين"
        text1="$ سعر الاستثمار: من 1001 الى 10.000"
        text2=" سعر الفائدة بالمئة: 30"
        text3="💵 الربح: 300 - 3000 دولار"
      />
      <InvestmentBox
        title="💰 المستوى: ألماسي"
        text1="$ سعر الاستثمار: من 10.001 إلى 100.000"
        text2=" سعر الفائدة بالمئة: 50"
        text3="💵 الربح: 5000 - 50.000 دولار"
      />

    </ScrollView>
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
  card: {
    elevation: 3,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
    color: '#555',
  },
  msg : {
    fontSize: 10,
    textAlign: 'right',
    marginTop: 10,
    color: '#f71414ff',
  },
  value: {
    fontSize: 18,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#222',
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

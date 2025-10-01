import InvestmentBox from '@/components/InvestBox';
import StakingCalculator from '@/components/StakingCalculator';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { useUser } from '@/components/UserContext';

export default function Home() {
 
  const { user, loading } = useUser();
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
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

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title
          title={user.name}
          left={(props) => <Avatar.Text {...props} label={user.name[0]} />}
        />
        <Card.Content>
          <Text style={styles.label}>💰 الرصيد</Text>
          <Text style={styles.value}>{user.balance}</Text>

          <Text style={styles.label}>🔗 عنوان المحفظة</Text>
          <Text style={styles.value}>{user.wallet}</Text>

          <Text style={styles.label}> كود الإحالة</Text>
          <Text style={styles.value}>{user.referral_code}</Text>

          <View style={styles.buttonRow}>
            <Button
                      mode="outlined"

              onPress={() => {
                Clipboard.setString(user.referral_code);
                Alert.alert('تم النسخ', 'تم نسخ العنوان إلى الحافظة');
              }}
              style={styles.button}
            >
              نسخ الإحالة
            </Button>

            <Button
                    mode="contained"

              onPress={() => {
                Clipboard.setString(user.wallet);
                Alert.alert('تم النسخ', 'تم نسخ العنوان إلى الحافظة');
              }}
              style={styles.button}
            >
              نسخ رابط المحفظة
            </Button>
          </View>
        </Card.Content>
      </Card>
      <StakingCalculator />

      {/* Investment tiers */}
      <InvestmentBox
        title="💰 المستوى: فضي"
        text1="📦 سعر الاستثمار: 10 -> 100"
        text2="📈 سعر الفائدة بالمئة: 20"
        text3="💵 الربح: 2 - 20 دولار"
      />
      <InvestmentBox
        title="💰 المستوى: الذهبي"
        text1="📦 سعر الاستثمار: 101 -> 1000"
        text2="📈 سعر الفائدة بالمئة: 25 "
        text3="💵 الربح: 25 - 250 دولار"
      />
      <InvestmentBox
        title="💰 المستوى: بلاتين"
        text1="📦 سعر الاستثمار: 1001 -> 10.000"
        text2="📈 سعر الفائدة بالمئة: 30"
        text3="💵 الربح: 300 - 3000 دولار"
      />
      <InvestmentBox
        title="💰 المستوى: ألماسي"
        text1="📦 سعر الاستثمار: 10.001 -> 100.000"
        text2="📈 سعر الفائدة بالمئة: 50"
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
    marginTop: 30,
    elevation: 3,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
    color: '#555',
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

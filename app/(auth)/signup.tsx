import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import ArabicText from '../../components/ArabicText';

export default function SignUp() {

  const handleRegister = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
        referral_code: referralCode || undefined, // 👈 include it only if filled
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('تم إنشاء الحساب بنجاح');
      router.push('/login');
    } else {
      alert('حدث خطأ: ' + JSON.stringify(data));
    }
  } catch (error) {
    alert('فشل الاتصال بالخادم');
    console.error(error);
  }
};

  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>إنشاء حساب جديد</Text>

      <TextInput
        label="اسم المستخدم"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        contentStyle={{ fontFamily: 'Cairo', textAlign: 'right' }} // 👈 this affects input text
      />

      <TextInput
        label="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        label="تأكيد كلمة المرور"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        contentStyle={{ fontFamily: 'Cairo', textAlign: 'right' }} // 👈 this affects input text
      />
      
      <TextInput
        label="كود الإحالة (اختياري)"
        value={referralCode}
        onChangeText={setReferralCode}
        mode="outlined"
        style={styles.input}
        contentStyle={{ fontFamily: 'Cairo', textAlign: 'right' }}
      />

      <Button
        labelStyle={{ fontFamily: 'Cairo', fontSize: 18 }}
        mode="contained"
        icon="account-plus"
        onPress={handleRegister}
        style={styles.button}
      >
        تسجيل
      </Button>

      <View style={styles.loginRow}>
        <ArabicText style={styles.loginLink} onPress={() => router.push('/login')}>
          تسجيل الدخول
        </ArabicText>
        <ArabicText>لديك حساب؟ </ArabicText>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Cairo',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    fontFamily: 'Cairo',
  },
  button: {
    marginTop: 16,
  },

  loginRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 16,
},
loginLink: {
  color: '#007AFF', // iOS blue or use theme.colors.primary
  textDecorationLine: 'underline',
  fontFamily: 'Cairo',
},

});

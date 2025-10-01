import ArabicText from '@/components/ArabicText';
import ErrorDialog from '@/components/ErrorDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';



export default function Login() {

    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showError = (msg: string) => {
      setErrorMessage(msg);
      setErrorVisible(true);
    };
  const handleLogin = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email, // or use actual username if required
        password: password,
      }),
    });


    const data = await response.json();
    if (response.ok && data.access) {
      await AsyncStorage.setItem('Token', data.access);
      router.replace('../(core)/home');
    } else {
      showError('فشل تسجيل الدخول: ' + (data.detail || 'تحقق من البيانات المدخلة'));
    }
  } catch (error) {
    console.error(error);
    showError('خطأ في الاتصال بالخادم');
  }
};

  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
    <ErrorDialog
      visible={errorVisible}
      message={errorMessage}
      onDismiss={() => setErrorVisible(false)}
    />
      <Text style={[styles.title, { color: theme.colors.primary }]}>  تسجيل الدخول</Text>

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


      <Button
        labelStyle={{ fontFamily: 'Cairo', fontSize: 18 }}
        mode="contained"
        icon="account-arrow-left"
        onPress={handleLogin}
        style={styles.button}
      >
        تسجيل الدخول
      </Button>

      <View style={styles.loginRow}>
              <ArabicText style={styles.loginLink} onPress={() => router.push('/signup')}>
                إنشاء حساب جديد
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

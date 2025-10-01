import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { router } from 'expo-router';

type Investment = {
  amount: string;
  percent: string;
  daily_reward: string;
  start_date: string;
  end_date: string;
  accumulated_reward : string;
  is_active: boolean;

};

type User = {
  name: string;
  email : string;
  wallet: string;
  balance: string;
  referral_code: string;
  invited_users : string;
  vip_users : string;
  is_vip : string,
    investments: Investment[]; // 👈 Add this

};

type UserContextType = {
  user: User | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({ user: null, loading: true });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');
        const response = await fetch('http://127.0.0.1:8000/api/user/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setUser({
            name: data.username,
            email : data.email,
            wallet: data.wallet.address,
            balance: `${data.wallet.balance} USDT`,
            referral_code: `${data.referral_code}`,
            invited_users : `${data.invited_users}`,
            vip_users : `${data.vip_users}`,
            is_vip : `${data.is_vip}`,
            investments: data.investments.map((inv: any) => ({
              amount: inv.amount,
              percent: inv.percent,
              daily_reward: inv.daily_reward,
              start_date: inv.start_date,
              end_date: inv.end_date,
              is_active: inv.is_active,
              accumulated_reward : inv.accumulated_reward,
            })),
          });
        } else if (response.status === 401) {
          await AsyncStorage.removeItem('Token');
          router.replace('/(auth)/login');
        } else {
          Alert.alert('خطأ', 'فشل في جلب بيانات المستخدم');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('خطأ', 'تعذر الاتصال بالخادم');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

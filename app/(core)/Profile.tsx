import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Button, Divider, List, Card } from 'react-native-paper';
import { useUser } from '@/components/UserContext';
import { router } from 'expo-router';
import ArabicText from '@/components/ArabicText';
const ProfileScreen = () => {


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


  if (!user?.investments?.length) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>لا يوجد استثمار حالي</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Avatar.Text label={user.name[0]} />
      <Text style={styles.label}>اسم المستخدم</Text>

      <Text style={styles.name}> {user.name}</Text>
      <Text style={styles.label}>البريد الإلكتروني</Text>
      <Text style={styles.value}>{user.email}</Text>
      <Divider style={styles.divider} />
      <List.Item
        title="الدخل اليومي"
        right={props => <List.Icon {...props} icon="cash-fast" />}
        left={props =>  <ArabicText>{user.balance }</ArabicText>}
      />

      <List.Item
        title=": الحالة"
        right={props => <List.Icon {...props} icon="check-decagram" />}
        left={props =>  <ArabicText>{user.is_vip ? 'vip' : 'not vip'}</ArabicText>}
      />

      <List.Item
        title=": التسجيلات"
        right={props => <List.Icon {...props} icon="share-outline" />}
        left={props =>  <ArabicText>{user.invited_users}</ArabicText>}
      />

      <List.Item
        title=": المستثمرون النشطون"
        right={props => <List.Icon {...props} icon="share" />}
        left={props =>  <ArabicText>{user.vip_users}</ArabicText>}
      />

<View style={styles.container}>
  {user.investments.map((inv, index) => {
    let rank = '';
    switch (inv.percent) {
      case '20': rank = 'فضي'; break;
      case '25': rank = 'ذهبي'; break;
      case '30': rank = 'بلاتين'; break;
      case '50': rank = 'ألماسي'; break;
      default: rank = 'غير معروف';
    }

    return (
      <View key={index}>
        <Text style={styles.title}>الاستثمار {index + 1}</Text>

        <List.Item
          title=":المبلغ المستثمر"
          right={props => <List.Icon {...props} icon="hand-coin" />}
          left={props => <ArabicText>{inv.amount}</ArabicText>}
        />

        <List.Item
          title=":المستوى"
          right={props => <List.Icon {...props} icon="badge-account-outline" />}
          left={props => <ArabicText>{rank}</ArabicText>}
        />

        <List.Item
          title=":الربح الشهري"
          right={props => <List.Icon {...props} icon="badge-account-outline" />}
          left={props => <ArabicText>{(parseFloat(inv.daily_reward) * 30).toFixed(2)} USDT</ArabicText>}
        />
        <List.Item
          title=": حالة الاستثمار"
                    right={props => <List.Icon {...props} icon="adjust" />}

          left={props => (
            <ArabicText style={{ color: "#21e61aff" }}>
              {inv.is_active ? 'نشط' : 'منتهي'}
            </ArabicText>
          )}
        />
        <Divider />

      </View>
    );
  })}
  <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}> إجمالي الربح حتى اليوم</Text>
            <Text style={styles.amount}>{user.investments.map((inv, index) => (inv.accumulated_reward) )} </Text>
          </Card.Content>
        </Card>
</View>





      <Button mode="contained" style={styles.button}>
        تسجيل الخروج 
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
   card: {
    margin: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#f0f8ff',
  },
  amount: {
    textAlign: 'center',
    fontSize: 20,
    color: '#0077cc',
    fontWeight: '600',
  },
  title: {
    direction: "rtl",
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center', // ✅ This centers the text
    fontSize: 16,
    color: '#333',
  },
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
    alignItems: 'flex-end', // Align content to the right
  },
  name: {
    fontSize: 24,
    marginVertical: 10,
    textAlign: 'right',
    fontFamily: 'Cairo-Bold',
  },
  label: {
    fontSize: 16,
    color: '#888',
    textAlign: 'right',
    marginTop: 10,
    fontFamily: 'Cairo-Regular',
  },
  value: {
    fontSize: 18,
    textAlign: 'right',
    fontFamily: 'Cairo-Regular',
  },
  divider: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
});

export default ProfileScreen;

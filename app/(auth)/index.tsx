import { router } from "expo-router";
import * as React from 'react';
import { StyleSheet, View } from "react-native";
import { Button } from 'react-native-paper';
import ArabicText from '../../components/ArabicText';

export default function Page() {

  // const [fontsLoaded] = useFonts({
  //   Cairo: require('../assets/fonts/Cairo-Regular.ttf'),
  // });
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ArabicText style={styles.title}>مرحباً بك</ArabicText>
        <ArabicText style={styles.subtitle}>دعنا نبدأ إعداد الحساب </ArabicText>
          <Button 
          labelStyle={{ fontFamily: 'Cairo', fontSize: 18 }}
          style={styles.button} icon="arrow-left" mode="outlined" onPress={() => router.push("/signup")}>
              ابدأ
          </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button : {
    marginTop : 7,
    fontFamily: 'Cairo'
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    textAlign : "right",
    fontSize: 64,

  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

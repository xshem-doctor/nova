import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Text, View, StyleSheet, Image } from 'react-native';


const CustomIcon = () => (
  <Image
    source={require('../assets/images/appheader3.png')}
    style={{ width: 26 , height: 26}}
  />
);
interface AppHeaderProps {
  user: {
    name: string;
  };
}

const AppHeader: React.FC<AppHeaderProps> = ({ user }) => (
  <Appbar.Header style={{ backgroundColor: "#6750A4" }}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Nova Coin Up</Text>
    </View>
    <View style={styles.cardHeader}>
      <Image
        source={require('../assets/images/userprofile.png')}
        style={styles.avatar}
      />
      <Text style={styles.cardTitle}>{user.name}</Text>
    </View>
  </Appbar.Header>
);


const styles = StyleSheet.create({
    titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffff",
    margin : 5,
  },

    cardHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  avatar: {
    width: 26,
    height: 26,
    marginLeft: 8,
  },
  cardTitle: {

    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },


});


export default AppHeader;
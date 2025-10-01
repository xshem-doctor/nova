import CashIn from '@/app/(core)/cash';
import CashOut from '@/app/(core)/cashout';
import Home from '@/app/(core)/home';
import Profile from '@/app/(core)/Profile';
import * as React from 'react';
import { BottomNavigation, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { UserProvider } from './UserContext';


const HomeRoute = () => <Home/>;
const AssetsRoute = () => <CashIn />;
const WithdorwRoute = () => <CashOut />;
const ProfileRoute = () => <Profile />;

const Navigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'الرئيسية', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'assets', title: 'المحفظة', focusedIcon: 'account-cash' , unfocusedIcon: 'account-cash-outline' },
    { key: 'withdorw', title: 'السحب', focusedIcon: 'cash-refund' },
    { key: 'profile', title: 'الملف الشخصي', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    assets: AssetsRoute,
    withdorw: WithdorwRoute,
    profile: ProfileRoute,
  });

  return (
    <UserProvider>
      <PaperProvider theme={MD3LightTheme}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </PaperProvider>
    </UserProvider>
  );
};

export default Navigation;

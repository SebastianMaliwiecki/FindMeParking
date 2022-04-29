import TabNavigator from './TabNavigator';
import { NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import NavigationManager from './NavigationManager';
import { PermitProvider } from './context/PermitContext';
import { LogBox } from 'react-native';


export default function App() {

  //LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <AuthProvider>
        <UserProvider>
          <PermitProvider>
            <NavigationManager/>
          </PermitProvider>
        </UserProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

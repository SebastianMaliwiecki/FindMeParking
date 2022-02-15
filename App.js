import TabNavigator from './TabNavigator';
import { NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import NavigationManager from './NavigationManager';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <UserProvider>
          <NavigationManager/>
        </UserProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

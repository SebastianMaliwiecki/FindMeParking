import TabNavigator from './TabNavigator';
import { NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import { AuthProvider } from './context/AuthContext';
import NavigationManager from './NavigationManager';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <NavigationManager/>
      </AuthProvider>
    </NavigationContainer>
  );
}

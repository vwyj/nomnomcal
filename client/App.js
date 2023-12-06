// Summary: set-up the basic structure of a React Native application with navigation. 
// App component wraps the root navigation structure (<RootNavigation />) inside a <NavigationContainer>. 
// This structure is essential to manage the navigation flow and screens within the app using @react-navigation/native library.

import { NavigationContainer } from '@react-navigation/native'; // Component that wraps the entire navigation structure of a React Native app
import RootNavigation from './navigation';  // Root navigation structure of the application

export default function App() 
{
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};
 
// Summary: RootNavigation serves as the entry point for the navigation structure of the application. 
// It wraps the ScreenMenu component with context providers (AuthProvider and PostProvider), 
// ScreenMenu component relies on authentication and post-related context provided by these providers.

import { View, Text } from 'react-native';    // Import React Native Components (View, Text)
import React from 'react';                    // Import React Library to write JSX (JavaScript XML)
import { AuthProvider } from './context/authContext';
import { PostProvider } from './context/postContext';
import ScreenMenu from './components/Menus/ScreenMenu';

const RootNavigation = () => {
  // Return JSX for Navigation Structure
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
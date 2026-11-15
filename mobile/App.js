import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <WebView
          source={{ uri: 'https://id-preview--52c222d8-6abd-48be-9faf-8f8a0334e8b9.lovable.app' }}
          style={styles.webview}
          allowsBackForwardNavigationGestures
          pullToRefreshEnabled
          sharedCookiesEnabled
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9f6',
  },
  webview: {
    flex: 1,
    backgroundColor: '#f7f9f6',
  },
});

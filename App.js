import React from 'react';
import AppNavigator from 'screens/AppNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from 'store';
import { StatusBar, Image } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Container, Content, Text } from 'native-base';
import pokeballLoading from './src/assets/pokeball_loading.gif';

const Loading = () => {
  const containerStyle = { flex: 1, backgroundColor: '#ef5350' };
  const contentStyle = { alignItems: 'center', justifyContent: 'center', flex: 1 };
  const imageStyle = { height: 94, width: 94 };
  const textStyle = {
    fontFamily: 'Pokemon Solid',
    color: '#ffc919',
    fontSize: 46,
    textShadowColor: '#345fab',
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  };

  return (
    <Container style={containerStyle}>
      <Content contentContainerStyle={contentStyle}>
        <Image source={pokeballLoading} style={imageStyle} />
        <Text
          style={textStyle}
        >
          PokéPedia
        </Text>
      </Content>
    </Container>
  );
};

const App = () => (
  <Provider store={store}>
    <StatusBar backgroundColor="#b61827" />
    <PersistGate loading={<Loading />} persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
);

export default App;

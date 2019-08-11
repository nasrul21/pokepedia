import React from 'react';
import { View, Icon, Text, Button } from 'native-base';
import PropTypes from 'prop-types';

const ErrorComponent = (props) => {
  const styles = {
    container: {
      alignItems: "center",
      paddingVertical: 20,
    },
    icon: {
      fontSize: 64,
      color: 'grey',
      marginBottom: 10,
    },
    text: {
      fontSize: 20,
      color: 'grey',
      marginBottom: 10,
    },
  }

  return (
    <View style={styles.container}>
      <Icon name="signal-wifi-off" type="MaterialIcons" style={styles.icon} />
      <Text style={styles.text}>No Internet Connection</Text>
      <Button onPress={props.onButtonPress} danger>
        <Text>Try Again</Text>
      </Button>
    </View>
  );
}

ErrorComponent.propTypes = {
  onButtonPress: PropTypes.func,
}

export default ErrorComponent;
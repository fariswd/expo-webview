import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  WebView,
 } from 'react-native'

export default class WebviewComponents extends React.Component {
  render() {
    const { url } = this.props
    return (
      <View style={styles.container}>
        <WebView
          startInLoadingState={true}
          source={{uri: url}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 23,
  },
});

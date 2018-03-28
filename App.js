import React from 'react';
import { AsyncStorage,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native'
import WebviewComponents from './WebviewComponents'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      myurl: '',
      redirect: false,
    }
  }

  componentDidMount = async () => {
    try {
      const myurl = await AsyncStorage.getItem('myurl');
      if (myurl !== null){
        this.setState({
          myurl: myurl
        })
      }
    } catch (error) {
      console.log('cannot get myurl from async storage')
    }
  }

  presistData = async (myurl) => {
    try {
      await AsyncStorage.setItem('myurl', myurl);
    } catch (error) {
      console.log('error save myurl', error)
    }
  }

  removeUrlData = async () => {
    try {
      await AsyncStorage.removeItem('myurl');
    } catch (error) {
      console.log('error save myurl', error)
    }
  }

  renderFormUrl = () => {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>Input URL:</Text>
        <TextInput
          style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(myurl) => this.setState({myurl})}
          value={this.state.myurl}
        />
        <View style={{width: 300, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            onPress={() => this.removeUrlData()}
            title="Remove URL"
          />
          <Button
            onPress={() => this.presistData(this.state.myurl)}
            title="Save URL"
          />
          <Button
            onPress={() => this.setState({redirect: true})}
            title="GO to URL"
          />
        </View>
      </View>
    )
  }

  render() {
    if(this.state.redirect) {
      return (
        <WebviewComponents url={this.state.myurl}/>
      );
    } else {
      return this.renderFormUrl()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '5%',
  }
})

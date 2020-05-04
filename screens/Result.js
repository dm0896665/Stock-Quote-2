import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
} from 'react-native';

const style = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  big: {
    fontSize: 17,
  },
  red: {
    color: 'red',
  },
});

export default class Result extends Component {
    constructor() {
        super()
        this.state = {
           title: 'Underweight'
        }
     }

     updateText = () => {
        this.setState({myText: 'My Changed Text'})
     }
    render() {
      return (
        <View style={styles.body}>
            <View style={styles.sectionContainer, style.center}>

                <Text style={styles.result}>
                    {this.props.navigation.state.params.symbol}
                </Text>
                <Text style={styles.title}>
                    {this.props.navigation.state.params.current}
                </Text>
            </View>
        </View>
      )
    }
  }

const styles = StyleSheet.create({
  scrollView: {
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  title: 
  {
    fontSize: 30,
    padding: 20
  },
  result:
  {
    fontSize: 36,
    padding: 20
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    padding: 20,
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    padding: 10,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

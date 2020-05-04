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
  TextInput,
  useState,
  FlatList,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

const style = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  uncenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  big: {
    fontSize: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginRight: 70,
  },
  red: {
    color: 'red',
  },
});

var favs = ['kins'];

var symb = "";
var cur = 0;
var change = "";
var high = 0;
var low = 0;
var err = false;

function getData(sym) 
{
  callAPI(sym);
  console.log("symb: " + symb);
  return {err: err, symb: symb, cur: cur, change: change, high: high, low: low};
}

function callAPI(sym)
{
  return fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + sym + '&apikey=S7HFDAMOZVXRT89N')
  .then((response) => response.json())
  .then((responseJson) => {
    if(responseJson["Error Message"] == undefined)
    {
      err = false;
      symb = responseJson["Global Quote"]["01. symbol"];
      cur = responseJson["Global Quote"]["05. price"];
      change = responseJson["Global Quote"]["10. change percent"];
      high = responseJson["Global Quote"]["03. high"];
      low = responseJson["Global Quote"]["04. low"];
      console.log("symbs: " + symb);
    }
    else
      err = true;
    return {err: err, symb: symb, cur: cur, change: change, high: high, low: low};
  })
  .catch((error) => {
  console.error("error: " + error);
  });
}



const toastNo = () => {
  ToastAndroid.show("That stock symbol does not exist!", ToastAndroid.SHORT);
};


export default class Home extends Component
{
    constructor()
    {
        super()
        this.state =
        {
            symbol: "",
            symb: "",
            cur: 0,
            change: "",
            high: 0,
            low: 0,
            err: false
        }
        this.handleChangeSymbol = this.handleChangeSymbol.bind(this)
        this.handleChangeSymb = this.handleChangeSymb.bind(this)
        this.handleChangeCur = this.handleChangeCur.bind(this)
        this.handleChangeChange = this.handleChangeChange.bind(this)
        this.handleChangeHigh = this.handleChangeHigh.bind(this)
        this.handleChangeLow = this.handleChangeLow.bind(this)
        this.handleChangeErr = this.handleChangeErr.bind(this)
    }
    handleChangeSymbol(newText){
        this.setState({
            value: newText
        })
        this.state.symbol = newText
    }
    handleChangeSymb(newText){
      this.setState({
          value: newText
      })
      this.state.symb = newText
    }
    handleChangeCur(newText){
      this.setState({
          value: newText
      })
      this.state.cur = newText
    }
    handleChangeChange(newText){
      this.setState({
          value: newText
      })
      this.state.change = newText
    }
    handleChangeHigh(newText){
      this.setState({
          value: newText
      })
      this.state.high = newText
    }
    handleChangeLow(newText){
      this.setState({
          value: newText
      })
      this.state.low = newText
    }
    handleChangeErr(newText){
      this.setState({
          value: newText
      })
      this.state.err = newText
    }
    getDatas(sym) 
    {
      this.callAPI(sym);
      console.log("symbsss: " + symb);
      return {err: err, symb: symb, cur: cur, change: change, high: high, low: low};
    }

    async callAPI(sym)
    {
      return fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + sym + '&apikey=S7HFDAMOZVXRT89N')
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson["Error Message"] == undefined)
        {
          this.setState({err: false});
          this.setState({symb: responseJson["Global Quote"]["01. symbol"]});
          this.setState({cur: responseJson["Global Quote"]["05. price"]});
          this.setState({change: responseJson["Global Quote"]["10. change percent"]});
          this.setState({high: responseJson["Global Quote"]["03. high"]});
          this.setState({low: responseJson["Global Quote"]["04. low"]});

          this.state.stock.err = false;
          this.state.stock.symb = responseJson["Global Quote"]["01. symbol"];
          this.state.stock.cur = responseJson["Global Quote"]["05. price"];
          this.state.stock.change = responseJson["Global Quote"]["10. change percent"];
          this.state.stock.high = responseJson["Global Quote"]["03. high"];
          this.state.stock.low = responseJson["Global Quote"]["04. low"];

          this.handleChangeSymb(responseJson["Global Quote"]["01. symbol"]);
          this.handleChangeCur(responseJson["Global Quote"]["05. price"]);
          this.handleChangeChange(responseJson["Global Quote"]["10. change percent"]);
          this.handleChangeHigh(responseJson["Global Quote"]["03. high"]);
          this.handleChangeLow(responseJson["Global Quote"]["04. low"]);
          this.handleChangeErr(false);

          console.log("symbs: " + this.state.symb);
        }
        else
        {
          this.setState({
            err: true,
          });
          this.state.err = true;
          this.handleChangeErr(true);
        }
        return JSON.stringify(responseJson, ["Global Quote"]["01. symbol"]);
      })
      .catch((error) => {
      console.error("error: " + error);
      });
    }

    render()
    {
        return (

            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <View style={style.uncenter} >
                  <TextInput
                    style={[style.center, style.big]}
                    placeholder="Enter a stock symbol"
                    onChangeText={this.handleChangeSymbol}
                  />

                  <TouchableOpacity onPress={() => {
                      var help = getData(this.state.symbol)
                      console.log(help)
                      if(err)
                        toastNo.call();
                      else
                      {
                        var favorite = favs.includes(this.state.symb);
                        console.log("symb " + this.state.symb)
                        this.props.navigation.navigate('Result', {symbol: this.state.symb, current: this.state.cur, change: this.state.change, high: this.state.high, low: this.state.low, fav: favorite});
                      }
                    }}>
                    <Image style={{width:33, height:33, marginTop:10}} source={require('../img/search.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
                
              <FlatList
                style={{marginTop:50}}
                data={favs}
                renderItem={({ item }) => (
                  <TouchableOpacity style = {{textAlign: 'center', alignSelf:'center'}}
                    onPress={() => {
                      
                    }}
                  >
                    <Text style ={{fontSize: 20}}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
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
  body: {
  },
  sectionContainer: {
    marginTop: 0,
    paddingHorizontal: 24,
    padding: 0,
  },
  sectionTitle: {
    fontSize: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    padding: 10,
  },
  highlight: {
  },
  footer: {
    fontSize: 12,
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

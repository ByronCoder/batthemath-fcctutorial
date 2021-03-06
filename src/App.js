import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker } from "react-native";

import './App.css';

class App extends React.Component {
  state = {
    answer: '',
    numOfEnemies: 3,
    val1: 0,
    val2: 0,
    won: false,
    operator: '+',
    mode: 'addition'
  }

  componentDidMount() {
    this.newProblem()
  }

  handleModePicker = (val) => {
    switch(val) {
      case 'addition':  
        this.setState({mode: val, operator: '+'})
      break;
      case 'subtraction':
        this.setState({mode: val, operator: '-'})
      break;
      case 'multiplication':
        this.setState({ mode: val,operator: '*'})
      break;
      case 'division':
         this.setState({mode: val, operator: '/'})
        break;
      default:
        console.log('not an option');
        break;
  }
}

  randomNum = max => Math.floor(Math.random() * Math.floor(max))

  checkAnswer = (operator) => {
    let correct
    switch(operator) {
      case 'addition':  
        correct = parseInt(this.state.answer, 10) === this.state.val1 + this.state.val2
        this.setState({operator: '+'})
      break;
      case 'subtraction':
        correct = parseInt(this.state.answer, 10) === this.state.val1 - this.state.val2
        this.setState({operator: '-'})
      break;
      case 'multiplication':
        correct = parseInt(this.state.answer, 10) === this.state.val1 * this.state.val2
        this.setState({operator: '*'})
      break;
      case 'division':
         correct = parseInt(this.state.answer, 10) === this.state.val1 / this.state.val2
         this.setState({operator: '/'})
        break;
      default:
        console.log('not an option');
        break;

    }

     if(correct) {
       this.removeEnemy()
     
  
     }
     else {
       this.addEnemy()
     }
    this.newProblem()
}

removeEnemy = () => {
    this.setState(
      prev => ({numOfEnemies: prev.numOfEnemies - 1 }),
      () => {
        if(this.state.numOfEnemies === 0) {
         this.youWon()
        }
      }
    )
 }


addEnemy = () => {
  if(this.state.numOfEnemies < 6) {
    this.setState({numOfEnemies: this.state.numOfEnemies + 1})
  }
 
}

newProblem = () => {
  this.setState({val1: this.randomNum(10), val2: this.randomNum(10) })
}

youWon = () => {
  this.setState({won: true})
}


  render() {
    const {mode, answer, numOfEnemies, val1, val2, won, operator} = this.state
    const activeTheme = themes[mode]
    return (
      <View style={[styles.root, {backgroundColor: activeTheme.backgroundColor}]}>
   
        <Text style={styles.title}>Battle Math</Text>
        <Picker
            selectedValue={mode}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.handleModePicker(itemValue)
            }>
            <Picker.Item label="Addition(+)" value="addition" />
            <Picker.Item label="Subtraction(-)" value="subtraction" />
            <Picker.Item label="Multiplication(*)" value="multiplication" />
            <Picker.Item label="Division(/)" value="division" />
       </Picker>
        <View style={styles.battlefield}>
          <View style={styles.container}>
              <View style={[styles.hero, styles.character]} />
          </View>
        <View style={styles.container}>
          {[...Array(numOfEnemies)].map(i => (
            <View key={i} style={[styles.enemy, styles.character]} />
          ))} 
          </View>
        </View>
          {won ?  <Text>Victory!</Text> : 

        <View style={styles.mathContainer}>
        <View style={styles.mathRow}>
        <Text style={styles.mathText}>{val1} {operator} {val2} =</Text>
        <TextInput
          style={styles.input}
          onChangeText={(answer) => this.setState({ answer })}
          value={answer} />
          </View>
        <Button
          onPress={() => this.checkAnswer(mode)}
          title="Submit"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        </View>
        }
      </View>
    )
  }
}

const themes = {
  addition: {
    backgroundColor: 'green'
  },
  subtraction: {
    backgroundColor: 'pink'
  },
  multiplication: {
    backgroundColor: 'yellow'
  },
  division: {
    backgroundColor: 'orange'
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0,
    right: 0,
    paddingVertical: 16
  },
  title: {
    fontSize: 32,
    fontFamily: '"Comic Sans MS", cursive, sans-serif'
  },
  picker: {
    height: 60, 
    width: 150
  },
  battlefield: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'

  },
  character: {
    width: 80,
    height: 80
  },
  hero: {
    
    backgroundColor: 'blue' 
  },
  enemy: { 
    backgroundColor: 'red' 
  },
  mathContainer: {
    paddingVertical: 16,
  
  },
  mathRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 8
  },
  mathText:  {
    fontSize: 28,
    paddingRight: 8
  },
  input : {
    height: 40,
    width: 60, 
    borderColor: 'gray', 
    borderWidth: 1 
  }
});





export default App;

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);


  const addGoalHandler = goalTitle => {
    if (goalTitle.length === 0 ) {
      return;
    }
    setCourseGoals(currentGoals => [
      ...courseGoals,
      {  id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    })
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }


  return (
    <View style={styles.container}>
      <Button title='add new goal' onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler}/>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => 
            <GoalItem title={itemData.item.value} id = {itemData.item.id} onDelete={removeGoalHandler}/>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },

});

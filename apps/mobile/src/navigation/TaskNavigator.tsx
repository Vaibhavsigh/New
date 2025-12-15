import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskStackParamList } from './types';
import { TaskListScreen } from '../screens/tasks/TaskListScreen';
import { TaskDetailScreen } from '../screens/tasks/TaskDetailScreen';
import { TaskCreateScreen } from '../screens/tasks/TaskCreateScreen';
import { TaskEditScreen } from '../screens/tasks/TaskEditScreen';

const Stack = createStackNavigator<TaskStackParamList>();

export const TaskNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tasks' }} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Details' }} />
      <Stack.Screen name="TaskCreate" component={TaskCreateScreen} options={{ title: 'Create Task' }} />
      <Stack.Screen name="TaskEdit" component={TaskEditScreen} options={{ title: 'Edit Task' }} />
    </Stack.Navigator>
  );
};

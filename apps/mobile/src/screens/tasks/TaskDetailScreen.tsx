import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const TaskDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { taskId } = route.params;
  const theme = useAppTheme();

  return (
    <ScreenContainer style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Task Details: {taskId}</Text>
      <Text style={[styles.description, { color: theme.colors.text }]}>
        Here are the details for task {taskId}. Complete this task by the due date.
      </Text>
      
      <View style={[styles.statusContainer, { backgroundColor: theme.colors.card }]}>
          <Text style={{ color: theme.colors.text }}>Status: Pending</Text>
      </View>
      
      <Button 
        title="Edit Task" 
        onPress={() => navigation.navigate('TaskEdit', { taskId })} 
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
  },
  statusContainer: {
      padding: 15,
      borderRadius: 10,
      marginBottom: 30
  }
});

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../components/Icon';
import { useAppTheme } from '../../hooks/useAppTheme';

const MOCK_TASKS = [
  { id: '1', title: 'Complete React Native Project', completed: false, date: 'Today' },
  { id: '2', title: 'Review Code', completed: true, date: 'Yesterday' },
  { id: '3', title: 'Team Meeting', completed: false, date: 'Tomorrow' },
];

export const TaskListScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.taskItem, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
    >
      <Icon
        name={item.completed ? 'checkbox' : 'square-outline'}
        size={24}
        color={item.completed ? theme.colors.success : theme.colors.text}
      />
      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskTitle,
            {
              color: theme.colors.text,
              textDecorationLine: item.completed ? 'line-through' : 'none',
              opacity: item.completed ? 0.6 : 1,
            },
          ]}
        >
          {item.title}
        </Text>
        <Text style={[styles.taskDate, { color: theme.colors.border }]}>{item.date}</Text>
      </View>
      <Icon name="chevron-forward" size={20} color={theme.colors.border} />
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <FlatList
        data={MOCK_TASKS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('TaskCreate')}
      >
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  taskContent: {
    flex: 1,
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskDate: {
    fontSize: 12,
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

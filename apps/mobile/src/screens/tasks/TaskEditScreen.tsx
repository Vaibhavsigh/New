import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const TaskEditScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { taskId } = route.params;
  const theme = useAppTheme();

  const [title, setTitle] = useState(`Task ${taskId}`);
  const [description, setDescription] = useState('Existing description');

  const handleSave = () => {
    // Save logic
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Title</Text>
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100, color: theme.colors.text, borderColor: theme.colors.border }]}
          value={description}
          onChangeText={setDescription}
          multiline
        />
        
        <View style={styles.spacer} />
        <Button title="Save Changes" onPress={handleSave} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  spacer: {
      height: 20
  }
});

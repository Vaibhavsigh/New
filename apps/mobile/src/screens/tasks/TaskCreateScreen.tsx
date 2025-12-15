import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Icon } from '../../components/Icon';

export const TaskCreateScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigation = useNavigation<any>();
  const theme = useAppTheme();

  const handleChoosePhoto = async () => {
    // In real app use launchImageLibrary or launchCamera
    // Since we can't run native code easily here, we'll just simulate a selection
    // const result = await launchImageLibrary({ mediaType: 'photo' });
    setMedia({ uri: 'https://via.placeholder.com/150' });
    
    // Simulate upload
    let progress = 0;
    const interval = setInterval(() => {
        progress += 0.1;
        setUploadProgress(progress);
        if (progress >= 1) clearInterval(interval);
    }, 200);
  };

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
          placeholder="Task Title"
          placeholderTextColor={theme.colors.border}
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100, color: theme.colors.text, borderColor: theme.colors.border }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Task Description"
          placeholderTextColor={theme.colors.border}
          multiline
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Media</Text>
        <TouchableOpacity onPress={handleChoosePhoto} style={[styles.mediaButton, { borderColor: theme.colors.border }]}>
          <Icon name="camera" size={30} color={theme.colors.text} />
          <Text style={{ color: theme.colors.text }}>Add Photo</Text>
        </TouchableOpacity>

        {media && (
            <View style={styles.mediaPreview}>
                <Image source={{ uri: media.uri }} style={styles.image} />
                {uploadProgress < 1 && (
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${uploadProgress * 100}%`, backgroundColor: theme.colors.primary }]} />
                    </View>
                )}
            </View>
        )}

        <Text style={[styles.label, { color: theme.colors.text }]}>Reminders</Text>
        <TouchableOpacity style={[styles.optionItem, { borderColor: theme.colors.border }]}>
            <Text style={{ color: theme.colors.text }}>Set Date & Time</Text>
            <Icon name="calendar" size={20} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.spacer} />
        <Button title="Create Task" onPress={handleSave} />
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
  mediaButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  mediaPreview: {
      marginBottom: 20,
      alignItems: 'center'
  },
  image: {
      width: 200,
      height: 200,
      borderRadius: 10
  },
  progressBarContainer: {
      width: 200,
      height: 10,
      backgroundColor: '#eee',
      marginTop: 10,
      borderRadius: 5,
      overflow: 'hidden'
  },
  progressBar: {
      height: '100%',
  },
  optionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      alignItems: 'center'
  },
  spacer: {
      height: 20
  }
});

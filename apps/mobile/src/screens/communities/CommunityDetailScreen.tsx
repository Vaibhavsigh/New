import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useRoute } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const CommunityDetailScreen = () => {
  const route = useRoute<any>();
  const { communityId } = route.params;
  const theme = useAppTheme();

  return (
    <ScreenContainer style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.coverImage} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Community {communityId}</Text>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          This is a description of the community. Join us to participate in challenges and events!
        </Text>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Challenges</Text>
        <View style={[styles.challengeCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.challengeTitle, { color: theme.colors.text }]}>Summer Sprint</Text>
          <Text style={[styles.challengeDesc, { color: theme.colors.border }]}>Run 50km this month</Text>
          <Button title="Join Challenge" onPress={() => {}} />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  challengeCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  challengeDesc: {
    marginBottom: 10,
  },
});

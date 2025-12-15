import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Icon } from '../../components/Icon';
import { useAppTheme } from '../../hooks/useAppTheme';

const MOCK_FEED = [
  { id: '1', user: 'User 1', avatar: 'https://via.placeholder.com/50', content: 'Just finished a 5k run!', likes: 10, comments: 2, time: '2h ago' },
  { id: '2', user: 'User 2', avatar: 'https://via.placeholder.com/50', content: 'Working on a new React Native app.', likes: 25, comments: 5, time: '4h ago' },
  { id: '3', user: 'User 3', avatar: 'https://via.placeholder.com/50', content: 'Join my community challenge!', likes: 5, comments: 0, time: '1d ago' },
];

export const FeedScreen = () => {
  const theme = useAppTheme();

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.postContainer, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={[styles.username, { color: theme.colors.text }]}>{item.user}</Text>
          <Text style={[styles.time, { color: theme.colors.border }]}>{item.time}</Text>
        </View>
      </View>
      <Text style={[styles.content, { color: theme.colors.text }]}>{item.content}</Text>
      <View style={[styles.actions, { borderTopColor: theme.colors.border }]}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart-outline" size={20} color={theme.colors.text} />
          <Text style={[styles.actionText, { color: theme.colors.text }]}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chatbubble-outline" size={20} color={theme.colors.text} />
          <Text style={[styles.actionText, { color: theme.colors.text }]}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-outline" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenContainer>
      <FlatList
        data={MOCK_FEED}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 10,
  },
  postContainer: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    fontSize: 12,
  },
  content: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
  },
});

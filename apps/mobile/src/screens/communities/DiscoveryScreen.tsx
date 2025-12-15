import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';

const MOCK_COMMUNITIES = [
  { id: '1', name: 'Running Club', members: 120, image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Healthy Eating', members: 340, image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Meditation', members: 85, image: 'https://via.placeholder.com/100' },
];

export const DiscoveryScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('CommunityDetail', { communityId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
        <Text style={[styles.members, { color: theme.colors.border }]}>{item.members} members</Text>
      </View>
      <TouchableOpacity style={[styles.joinButton, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.joinText}>Join</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <FlatList
        data={MOCK_COMMUNITIES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  members: {
    fontSize: 12,
  },
  joinButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

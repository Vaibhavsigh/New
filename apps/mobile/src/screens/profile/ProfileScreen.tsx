import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Icon } from '../../components/Icon';

export const ProfileScreen = () => {
  const { user, signOut } = useAuthStore();
  const { mode, setMode } = useThemeStore();
  const theme = useAppTheme();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.avatarContainer, { borderColor: theme.colors.border }]}>
          <Icon name="person" size={50} color={theme.colors.text} />
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>{user?.email || 'User'}</Text>
        <Text style={[styles.bio, { color: theme.colors.text }]}>Mobile Developer | React Native Enthusiast</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statItem, { backgroundColor: theme.colors.card }]}>
          <Icon name="flame" size={24} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>12</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Streak</Text>
        </View>
        <View style={[styles.statItem, { backgroundColor: theme.colors.card }]}>
          <Icon name="medal" size={24} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>5</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Badges</Text>
        </View>
        <View style={[styles.statItem, { backgroundColor: theme.colors.card }]}>
          <Icon name="podium" size={24} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>#3</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Rank</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings</Text>
        <View style={styles.row}>
          <Text style={{ color: theme.colors.text }}>Theme: {mode}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Button title="Light" onPress={() => setMode('light')} />
            <Button title="Dark" onPress={() => setMode('dark')} />
            <Button title="System" onPress={() => setMode('system')} />
          </View>
        </View>
      </View>

      <Button title="Logout" onPress={() => signOut()} color={theme.colors.error} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bio: {
    marginTop: 5,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

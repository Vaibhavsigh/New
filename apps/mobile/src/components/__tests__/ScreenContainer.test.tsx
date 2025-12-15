import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ScreenContainer } from '../ScreenContainer';

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, style }: any) => <div style={style}>{children}</div>,
}));

// Mock useAppTheme
jest.mock('../../hooks/useAppTheme', () => ({
  useAppTheme: () => ({
    colors: {
      background: '#FFFFFF',
    },
  }),
}));

describe('ScreenContainer', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ScreenContainer>
        <Text>Test Content</Text>
      </ScreenContainer>
    );

    expect(getByText('Test Content')).toBeTruthy();
  });
});

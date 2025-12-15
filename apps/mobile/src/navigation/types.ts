export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type TabParamList = {
  Tasks: undefined;
  Social: undefined;
  Communities: undefined;
  Profile: undefined;
};

export type TaskStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  TaskCreate: undefined;
  TaskEdit: { taskId: string };
};

export type SocialStackParamList = {
  Feed: undefined;
};

export type CommunityStackParamList = {
  Discovery: undefined;
  CommunityDetail: { communityId: string };
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

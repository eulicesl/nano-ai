export const ActivityControllerModule = {
  startActivity: async () => ({ activityId: '' }),
  updateActivity: async () => {
    // no-op on Android; Live Activities are iOS-only
  },
  endActivity: async () => {
    // no-op on Android; Live Activities are iOS-only
  },
  isLiveActivityRunning: () => false
};

import { useRouter } from 'expo-router';
import { useAtomValue } from 'jotai';
import { AlertCircleIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { ConnectStatus, settings as settingsAtom } from '@/store/settings';

import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Text } from './ui/text';

export function ConnectTips(props: { className?: string }) {
  const { className } = props;
  const { ollama } = useAtomValue(settingsAtom);
  const router = useRouter();

  if (ollama.connectStatus === ConnectStatus.SUCCESSFUL) return null;

  return (
    <View className={className}>
      <Alert variant="destructive" icon={AlertCircleIcon}>
        <AlertTitle>Ollama server connect failed.</AlertTitle>
        <AlertDescription>
          Please go to{' '}
          <Text
            accessibilityHint="Opens settings screen"
            accessibilityRole="link"
            className="underline"
            onPress={() => {
              router.push('/settings');
            }}>
            Settings
          </Text>{' '}
          and update your Ollama API endpoint.
        </AlertDescription>
      </Alert>
    </View>
  );
}

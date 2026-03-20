import * as Haptics from 'expo-haptics';
import { ArrowUpIcon, Lightbulb } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { Keyboard, View } from 'react-native';

import { cn } from '@/lib/utils';
import { useChats } from '@/store/chats';
import { ConnectStatus, useSettingsValue } from '@/store/settings';

import { Button } from './ui/button';
import { Icon } from './ui/icon';
import { Textarea } from './ui/textarea';
import { Toggle } from './ui/toggle';

export function MainInput(props: { onSend: (input: string, think?: boolean) => Promise<void>; onAbort: () => void }) {
  const { onSend, onAbort } = props;
  const [input, setInput] = useState('');
  const { ollama, hapticFeedback } = useSettingsValue();
  const { connectStatus } = ollama;
  const [{ current, data }, { toggleThink }] = useChats();
  const { think, model, messages } = data[current];
  const inChatting = useMemo(() => {
    if (messages.length > 0) {
      const { isPending = false, isStreaming = false, isThinking = false, isAborted = false } = messages.at(-1)!;

      return (isPending || isStreaming || isThinking) && !isAborted;
    }

    return false;
  }, [messages]);

  const handleSend = async () => {
    setTimeout(() => {
      setInput('');
      Keyboard.dismiss();
    }, 0);
    await onSend(input, think);
  };

  useEffect(() => {
    setInput('');
  }, [current]);

  return (
    <View className="w-full rounded-2xl bg-accent p-2">
      <Textarea value={input} onChangeText={setInput} className="h-auto max-h-[250px] min-h-10 w-full resize-none rounded-2xl border-0" placeholder="Send a message" />
      <View className="mt-2 flex w-full flex-row justify-end gap-x-2">
        {model?.canThink ? (
          <Toggle
            accessibilityHint="Enable or disable thinking mode"
            accessibilityLabel="Toggle thinking mode"
            aria-label="Toggle thinking"
            variant="outline"
            size="sm"
            className="size-11 rounded-full border-0 bg-background shadow-none"
            pressed={think || false}
            onPressedChange={() => {
              if (hapticFeedback) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              toggleThink();
            }}>
            <Icon as={Lightbulb} className={cn('size-4', think ? 'fill-blue-500 stroke-blue-500' : '')} />
          </Toggle>
        ) : null}
        {inChatting ? (
          <Button accessibilityHint="Stops the current response generation" accessibilityLabel="Stop generating" accessibilityRole="button" size="icon" className="size-11 rounded-full" haptic onPress={onAbort}>
            <View className="size-3 rounded-[2px] bg-primary-foreground" />
          </Button>
        ) : (
          <Button
            accessibilityHint="Sends your message"
            accessibilityLabel="Send message"
            accessibilityRole="button"
            size="icon"
            className="size-11 rounded-full"
            disabled={!input || !model || connectStatus !== ConnectStatus.SUCCESSFUL}
            haptic
            onPress={handleSend}>
            <Icon as={ArrowUpIcon} className="size-4 text-primary-foreground" />
          </Button>
        )}
      </View>
    </View>
  );
}

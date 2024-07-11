import { type Message } from '@/components/ui/chat/chat';
import { capitalize } from '@/utils/words';

export const generatePrompts = (currentMessages: Message[]) => {
  return currentMessages.map((m) => `[${capitalize(m.role)}]\n${m.content}`).join('\n');
};

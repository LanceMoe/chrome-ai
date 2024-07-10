import { PauseCircleIcon, RefreshCwIcon } from 'lucide-react';

import { Button } from '../button';
import { ChatHandler } from './chat';

type Props = Pick<ChatHandler, 'stop' | 'reload'> & {
  showReload?: boolean;
  showStop?: boolean;
};

export function ChatActions(props: Props) {
  return (
    <div className="space-x-4">
      {props.showStop && (
        <Button variant="outline" size="sm" onClick={props.stop}>
          <PauseCircleIcon className="mr-2 h-4 w-4" />
          Stop generating
        </Button>
      )}
      {props.showReload && (
        <Button variant="outline" size="sm" onClick={props.reload}>
          <RefreshCwIcon className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
      )}
    </div>
  );
}

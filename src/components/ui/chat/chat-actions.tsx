import { PauseCircleIcon, RefreshCwIcon } from 'lucide-react';

import { Button } from '../button';
import { ChatHandler } from './chat';

type Props = Pick<ChatHandler, 'stop' | 'reload'> & {
  showReload?: boolean;
  showStop?: boolean;
};

export function ChatActions(props: Props) {
  const { showReload, showStop } = props;
  return (
    <div className="space-x-4">
      {!!showStop && (
        <Button variant="outline" size="sm" onClick={props.stop}>
          <PauseCircleIcon className="mr-2 h-4 w-4" />
          Stop generating
        </Button>
      )}
      {!!showReload && (
        <Button variant="outline" size="sm" onClick={props.reload}>
          <RefreshCwIcon className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
      )}
    </div>
  );
}

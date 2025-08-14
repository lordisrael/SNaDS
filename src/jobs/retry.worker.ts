    
import { onEvent, produceEvent } from "../services/queue.service";

onEvent(async (event) => {
  if (event.from !== 'retry') return;
  if (event.retry > 5) return; // stop retrying after 5 attempts

  const wait = Math.pow(2, event.retry) * 1000; // 2s, 4s, 8s ...
  setTimeout(async () => {
    await produceEvent({...event, from: undefined});
  }, wait);
});
  
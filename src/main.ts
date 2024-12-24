import { logger } from './application/logging';
import { web } from './application/web';

web.listen(3003, () => {
  logger.info('Listening on port 3003');
});

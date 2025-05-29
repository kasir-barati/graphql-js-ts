import { Provider } from '@nestjs/common';

import { VoidScalar } from '../../src/shared';

export function getDefaultProviders(): Provider[] {
  return [VoidScalar];
}

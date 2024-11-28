export interface CronTopPayload {
  top: {
    cpu: number;
    memory: number;
    freeCpu: number;
    inUseCpu: number;
  };
}

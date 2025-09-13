import { z } from 'zod';

import configConstants from '#core/config/fallback_constants';
const {
    DEFAULT_POSTGRES_CODE_CHALLENGE_URL
} = configConstants;

const globalEnvSchema = z.object({
    POSTGRES_CODE_CHALLENGE_URL: z.string().default(DEFAULT_POSTGRES_CODE_CHALLENGE_URL),
});

export type GlobalEnvSchema = z.infer<typeof globalEnvSchema>;

export const VALIDATED_ENVS = globalEnvSchema.parse(process.env);

process.env = { ...process.env, ...VALIDATED_ENVS };

declare global {
  namespace NodeJS {
    interface ProcessEnv extends GlobalEnvSchema {}
  }
}

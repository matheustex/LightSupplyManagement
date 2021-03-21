import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-dynalite',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
};

export default config;
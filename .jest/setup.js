/* istanbul ignore file */
import dotenv from 'dotenv';
import mockdate from 'mockdate';
dotenv.config({ path: '.env.test' });
jest.mock('uuid', () => {
  function v4() {
    return '1';
  }

  return { v4 };
});

mockdate.set(1598918400);

import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { server } from '@mocks/server';

beforeAll(() => {
    // Establish requests interception layer before all tests.
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    // Clean up after all tests are done, preventing this
    // interception layer from affecting irrelevant tests.
    server.close();
});

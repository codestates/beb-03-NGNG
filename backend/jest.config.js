module.exports = {
    testTimeout: 40000,
    preset: "ts-jest", // 이 부분에서 ts-jest를 사용한다고 알려준다
    testEnvironment: "node", //테스트 환경 'node' 환경을 사용한다 알려줌
    testMatch: ["**/tests/*.test.(ts|tsx)"], //js 파일은 dist에서도 감지가 될 수 있으니 폴더를 조정해서 test이 있는 위치로 잡아준다. 

    // setupFiles: ['./server/config.ts'],
};

// module.exports = {
//     collectCoverageFrom: [
//         '**/*.{js,jsx,ts,tsx}',
//         '!**/*.test.ts',
//         '!**/*.d.ts',
//         '!**/node_modules/**',
//     ],
//     moduleNameMapper: {
//         // Handle CSS imports (with CSS modules)
//         // https://jestjs.io/docs/webpack#mocking-css-modules
//         '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

//         // Handle CSS imports (without CSS modules)
//         '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

//         // Handle image imports
//         // https://jestjs.io/docs/webpack#handling-static-assets
//         '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,

//         // Handle module aliases
//         '^@/components/(.*)$': '<rootDir>/components/$1',
//     },
//     // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
//     testEnvironment: 'jsdom',
//     transform: {
//         // Use babel-jest to transpile tests with the next/babel preset
//         // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
//         '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
//     },
//     transformIgnorePatterns: [
//         '/node_modules/',
//         '^.+\\.module\\.(css|sass|scss)$',
//     ],
// }
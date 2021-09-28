// eslint-disable-next-line no-undef
module.exports = {
    rootDir: '../../',
    // https://github.com/FormidableLabs/enzyme-matchers/issues/86
    setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.js'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest'
    },
  
    verbose: true,
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    moduleNameMapper: {
        '\\.(css|scss).*$': 'identity-obj-proxy'
    },
    roots: ['src'],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['node_modules', '<rootDir>/dist', '<rootDir>/build', '.cache'],
    testURL: 'http://localhost/' // https://github.com/facebook/jest/issues/6769
}
  
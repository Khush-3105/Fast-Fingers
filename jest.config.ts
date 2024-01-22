
export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/$1',
        '\\.(gif|ttf|eot|svg|png)$': 'identity-obj-proxy',
        "\\.(css)$": "identity-obj-proxy"
    },
}
module.exports = {
  testEnvironment: 'jsdom', // Use JSDOM to test
  setupFiles: ['<rootDir>/test/setupJest.ts'], // setup files
  snapshotSerializers: ['miniprogram-simulate/jest-snapshot-plugin'], // snapshot serializer
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform all .js and .jsx files
    '^.+\\.tsx?$': 'ts-jest' // Transform all .ts and .tsx files
  },
  testPathIgnorePatterns: ['<rootDir>/examples/', 'esm', 'dist-titan'], // ignore e2e test
  coveragePathIgnorePatterns: ['/__test__/*', 'node_modules'], // ignore test files
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json'
    }
  },
  coverageThreshold: {
    global: {
      statements: 60, // %stmts是语句覆盖率 (statement coverage): 是不是每个语句都执行了？
      branches: 60, // %Branch分支覆盖率 (branch coverage): 是不是每个if代码块都执行了？
      functions: 60, // %Funcs函数覆盖率 (function coverage): 是不是每个函数都调用了？
      lines: 60 // %Lines行覆盖率 (line coverage): 是不是每一行都执行了？
    }
  }
};

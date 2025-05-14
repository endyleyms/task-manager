if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
}

global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
};

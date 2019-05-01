export function easyReducer(modelName: string, _handlers, init) {
  let handlers = {};
  Object.keys(_handlers).map(key => {
    handlers[`${modelName}/${key}`] = _handlers[key];
  });
  return (state = init, action) => {
    let handle = handlers[action.type] || (() => state);
    return handle(state, action.payload, action.type, action);
  };
}

export default easyReducer(
  'blogList',
  {
    update(state, payload) {
      return payload;
    },
    add(state, payload) {
      return state;
    }
  },
  []
);

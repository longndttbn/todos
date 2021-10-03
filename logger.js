// Logger ham trung gian
export default function logger(reducer) {
  return (preState, action, args) => {
      console.group(action)
      console.log('Pre state: ', preState);
      console.log('Actin arguments: ', args);

      const nextState = reducer(preState, action, args);
      
      console.log('Next state: ', nextState);

    console.groupEnd()
    return nextState;
  };
}

export const DefaultCode={
    html:`<html>
    <head>
      <title>HTML Sample</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style type="text/css">
        h1 {
          color: #CCA3A3;
        }
      </style>
      <script type="text/javascript">
        alert("I am a sample...");
      </script>
    </head>
    <body>
      <h1>Heading No.1</h1>
      <input disabled type="button" value="Click me" />
    </body>
  </html>`,
    css:`@keyframes flip {
        from {
          transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);
          animation-timing-function: ease-out;
        }
      
        40% {
          transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
            rotate3d(0, 1, 0, -190deg);
          animation-timing-function: ease-out;
        }
      
        50% {
          transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
            rotate3d(0, 1, 0, -170deg);
          animation-timing-function: ease-in;
        }
      
        80% {
          transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
            rotate3d(0, 1, 0, 0deg);
          animation-timing-function: ease-in;
        }
      
        to {
          transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);
          animation-timing-function: ease-in;
        }
      }
      
      .animated.flip {
        backface-visibility: visible;
        animation-name: flip;
      }`,
    javascript:`
    import { compose, curry, isFunction } from '../utils';
    import validators from '../validators';
    
    function create(initial, handler = {}) {
      validators.initial(initial);
      validators.handler(handler);
    
      const state = { current: initial };
    
      const didUpdate = curry(didStateUpdate)(state, handler);
      const update = curry(updateState)(state);
      const validate = curry(validators.changes)(initial);
      const getChanges = curry(extractChanges)(state);
    
      function getState(selector = state => state) {
        validators.selector(selector);
        return selector(state.current);
      }
    
      function setState(causedChanges) {
        compose(
          didUpdate,
          update,
          validate,
          getChanges,
        )(causedChanges);
      }
    
      return [getState, setState];
    }
    
    function extractChanges(state, causedChanges) {
      return isFunction(causedChanges)
        ? causedChanges(state.current)
        : causedChanges;
    }
    
    function updateState(state, changes) {
      state.current = { ...state.current, ...changes };
    
      return changes;
    }
    
    function didStateUpdate(state, handler, changes) {
      isFunction(handler)
        ? handler(state.current)
        : Object.keys(changes)
            .forEach(field => handler[field]?.(state.current[field]));
    
      return changes;
    }
    
    export { create };`
}
import React from 'react';

export enum KEYS {
  SPACE = 'Space',
  SHIFT_LEFT = 'ShiftLeft',
  SHIFT_RIGHT = 'ShiftRight',
  BACKSPACE = 'Backspace',
  ESCAPE = 'Escape',
  ENTER = 'Enter',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  KEY_A = 'KeyA',
  KEY_B = 'KeyB',
  KEY_C = 'KeyC',
  KEY_D = 'KeyD',
  KEY_E = 'KeyE',
  KEY_F = 'KeyF',
  KEY_G = 'KeyG',
  KEY_H = 'KeyH',
  KEY_I = 'KeyI',
  KEY_J = 'KeyJ',
  KEY_K = 'KeyK',
  KEY_L = 'KeyL',
  KEY_M = 'KeyM',
  KEY_N = 'KeyN',
  KEY_O = 'KeyO',
  KEY_P = 'KeyP',
  KEY_Q = 'KeyQ',
  KEY_R = 'KeyR',
  KEY_S = 'KeyS',
  KEY_T = 'KeyT',
  KEY_U = 'KeyU',
  KEY_V = 'KeyV',
  KEY_W = 'KeyW',
  KEY_X = 'KeyX',
  KEY_Y = 'KeyY',
  KEY_Z = 'KeyZ',
  NUM_0 = '0',
  NUM_1 = '1',
  NUM_2 = '2',
  NUM_3 = '3',
  NUM_4 = '4',
  NUM_5 = '5',
  NUM_6 = '6',
  NUM_7 = '7',
  NUM_8 = '8',
  NUM_9 = '9',
  VOLUME_UP = 'VolumeUp',
  VOLUME_DOWN = 'VolumeDown',
}
type TKeyboardListener = (e: KeyboardEvent) => void;
// TODO merge useShortcut with useMultiShortcut and accept array of 1 or more keys
/**
 * Invokes provided callback when specified key is pressed
 * @returns TUseShortcutResult - current event handler
 * @param {KEYS} key - tells what key to register callback for
 * @param {TUseShortcutResult} callback - this function is invoked when key is released
 * @see README.md for additional info
 * @example useShortcut(KEYS.SPACE, () => {console.log('Escape pressed')});
 */
const useShortcut = (key: KEYS, callback: TKeyboardListener): void => {
  const callbackRef = React.useRef<TKeyboardListener>(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  React.useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      if (e.code === key) {
        callbackRef.current?.(e);
      }
    };
    window.addEventListener('keyup', listener);
    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [key]);
};
/**
 * Invokes provided callback when specified key is pressed, prevents keyboard event default action
 * @returns TUseShortcutResult - current event handler
 * @param {KEYS} key - specifies for which keycode callback is called when pressed
 * @param {TKeyboardListener} callback - this function is invoked when key is pressed
 * @see README.md for additional info
 * @example usePreventedShortcut(KEYS.SPACE, () => {console.log('Escape pressed')});
 */
export const usePreventedShortcut = (key: KEYS, callback: TKeyboardListener): void => {
  useShortcut(key, (e) => {
    callback(e);
  });
  const prevent = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.code === key) {
        e.preventDefault();
      }
    },
    [key],
  );
  React.useEffect(() => {
    window.addEventListener('keydown', prevent);
    return () => {
      window.removeEventListener('keydown', prevent);
    };
  }, [prevent]);
};

export type TUseShortcutProps = Parameters<typeof useShortcut>;
export default useShortcut;

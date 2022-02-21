import { AtomEffect } from 'recoil'

/**
 * An [Atom Effect](https://recoiljs.org/docs/guides/atom-effects/) which syncs the state of an Atom
 * to a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) and vice versa.
 *
 * The state of this Atom is intended to be an object which facilitates communication to and from the Worker.
 *
 * * Whenever your app [recieves messages from the Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#sending_messages_to_and_from_a_shared_worker), the Atom's state is updated to match the recieved data.
 * * Whenever your app updates the Atom's state: the value is [sent to the Worker as an event](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage).
 *
 * @param worker The path to a script to execute as the Worker, or an instance of `Worker` to add the event to.
 *
 * @example
 * // my_atom.ts
 * import { useEffect } from 'react'
 * import { useSetRecoilState } from 'recoil'
 * import { WebWorkerSyncEffect } from '@locktech/atomic'
 *
 * const MyAtom = atom({
 *   key: 'myAtom',
 *   default: undefined,
 *   effects: [
 *     WebWorkerSyncEffect('./worker.js'), // or
 *     WebWorkerSyncEffect(new Worker('./worker.js')),
 *   ],
 * })
 *
 * const Component = () => {
 *   const setAtom = useSetRecoilState(MyAtom)
 *
 *   useEffect(() => setAtom('foo'), [setAtom])
 *
 *   return ...
 * }
 *
 * // --
 *
 * // worker.js
 *
 * onmessage = (e) => {
 *   console.log(e.data) // "foo"
 *   // ...
 * }
 */
export const WebWorkerSyncEffect =
  <T = unknown>(worker: string | Worker): AtomEffect<T> =>
  ({ onSet, setSelf }) => {
    // Use the given Worker, or initalize a new worker using the provided script
    const w = typeof worker === 'object' ? worker : new Worker(worker)

    // Each time the atom's state is set, send the newValue to the Worker thread.
    onSet((n) => w.postMessage(n))

    // Each message from the worker updates the atom's state, using the `data` recieved.
    const listener = (e: MessageEvent<T>) => setSelf(e.data)

    // Add and clean-up the Worker event listener.
    w.addEventListener('message', listener)
    return () => w.removeEventListener('message', listener)
  }

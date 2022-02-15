import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { useRecoilSnapshot } from 'recoil'
import type { Snapshot } from 'recoil'

export interface RecoilDebuggerProps {
  /**
   * Captures and logs changes to Recoil's state as they occur.
   *
   * To improve readability, only atoms whose state changes will be logged.
   *
   * @default true
   */
  captureChanges?: boolean
  /**
   * A list of atom `keys` to be excluded from debugging.
   *
   * @default []
   */
  excludedKeys?: string[]
  /**
   * A list of atom `keys` to be included in debugging.
   *
   * **Note:** When provided, forms an allowlist - debugging only the given keys.
   * An empty array signifies "debug no keys".
   *
   * @default undefined
   */
  includedKeys?: string[]
  /**
   * Store each and every [Snaptshot](https://recoiljs.org/docs/api-reference/core/Snapshot)
   * the debugger comes across, [respecting unique IDs](https://recoiljs.org/docs/api-reference/core/Snapshot#snapshot-ids).
   *
   * As can be expected, take caution when enabling this feature and working with (many) large atoms.
   *
   * **Note:** Snapshots are always saved, regardless of whether they contain
   * `excluded` or `included` keys or contain nodes that haven't actually changed value.
   *
   * @default false
   */
  storeSnapshots?: boolean
}

/**
 * A component which subscribes to changes to the Recoil state, providing tools for inspecting and managing it.
 *
 * **Note:** It is **your** responsibility to remove this component from your application before building and shipping it.
 * A simple workaround would be to only render it when the `process.env.NODE_ENV` environment variable is set to `'development'`.
 */
export const RecoilDebugger: FC<RecoilDebuggerProps> = ({
  captureChanges,
  excludedKeys,
  includedKeys,
  storeSnapshots,
}) => {
  const [snapshotList, setSnapshotList] = useState<Snapshot[]>([])

  const snapshot = useRecoilSnapshot()

  // Log changes to "included" nodes which are not "excluded".
  // Only occurs when `captureChanges` is enabled.
  useEffect(() => {
    if (!captureChanges) return

    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      if (excludedKeys.includes(node.key)) return

      if (Array.isArray(includedKeys) && !includedKeys.includes(node.key))
        return

      console.debug(node.key, snapshot.getLoadable(node))
    }
  }, [captureChanges, excludedKeys, includedKeys, snapshot])

  // Store each snapshot in the `snapshots` list.
  useEffect(() => {
    if (!storeSnapshots) return

    if (!snapshotList.some((s) => s.getID() !== snapshot.getID())) return

    setSnapshotList([...snapshotList, snapshot])
  }, [setSnapshotList, snapshot, snapshotList, storeSnapshots])

  return null
}

RecoilDebugger.displayName = 'RecoilDebugger'
RecoilDebugger.defaultProps = {
  captureChanges: true,
  excludedKeys: [],
  includedKeys: undefined,
  storeSnapshots: false,
}

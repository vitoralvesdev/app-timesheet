import {
  IStateTreeNode,
  IModelType,
  SnapshotIn,
  applySnapshot,
} from "mobx-state-tree";

export const withSetPropAction = <T extends IModelType<any, any>>(
  self: IStateTreeNode<T>,
) => ({
  setProp<K extends keyof SnapshotIn<T>>(key: K, value: SnapshotIn<T>[K]) {
    applySnapshot(self, {
      ...self,
      [key]: value,
    });
  },
});

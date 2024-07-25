import {
  IStateTreeNode,
  IModelType,
  SnapshotIn,
  applySnapshot,
} from "mobx-state-tree";

export const withSetPropAction = <T extends IModelType<any, any>>(
  self: IStateTreeNode<T>,
) => ({
  setProp<K extends keyof SnapshotIn<T>>(key: string, value: string | null) {
    applySnapshot(self, {
      ...self,
      [key]: value,
    });
  },
});

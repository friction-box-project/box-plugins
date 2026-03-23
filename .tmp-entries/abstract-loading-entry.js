import { mount, unmount } from 'svelte';
import Component from '/home/justin/projects/friction-project/box-plugins/plugins/abstract-loading/src/AbstractLoadingBox.svelte';
export function mountPlugin(target, props) {
  return mount(Component, { target, props });
}
export function unmountPlugin(instance) {
  unmount(instance);
}
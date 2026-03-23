import { mount, unmount } from 'svelte';
import Component from '/home/justin/projects/friction-project/box-plugins/plugins/polyglot/src/PolyglotBox.svelte';
export function mountPlugin(target, props) {
  return mount(Component, { target, props });
}
export function unmountPlugin(instance) {
  unmount(instance);
}
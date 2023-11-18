

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.c0acdc33.js","_app/immutable/chunks/scheduler.697555f3.js","_app/immutable/chunks/index.d72fc035.js"];
export const stylesheets = [];
export const fonts = [];

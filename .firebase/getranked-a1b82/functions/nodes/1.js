

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.98633154.js","_app/immutable/chunks/scheduler.697555f3.js","_app/immutable/chunks/index.d72fc035.js","_app/immutable/chunks/singletons.5718b987.js","_app/immutable/chunks/index.aef1c4af.js"];
export const stylesheets = [];
export const fonts = [];

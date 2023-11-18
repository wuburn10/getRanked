

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tournament/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.66e6e0b8.js","_app/immutable/chunks/scheduler.697555f3.js","_app/immutable/chunks/index.d72fc035.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/api.service.b26e568b.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.a63afba4.js","_app/immutable/chunks/index.aef1c4af.js","_app/immutable/chunks/navigation.c9e7eeab.js","_app/immutable/chunks/singletons.5718b987.js"];
export const stylesheets = ["_app/immutable/assets/ProgressBar.bd53154f.css"];
export const fonts = [];

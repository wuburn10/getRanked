import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="space-y-10 text-center flex flex-col items-center"><a href="/register" class="btn variant-filled" data-svelte-h="svelte-1yniqcg">Register</a> <a href="/login" class="btn variant-filled" data-svelte-h="svelte-1ibuuqo">Login</a> <a href="/tournament" class="btn variant-filled" data-svelte-h="svelte-1fh6vvg">Tournament</a></div> </div>`;
});
export {
  Page as default
};

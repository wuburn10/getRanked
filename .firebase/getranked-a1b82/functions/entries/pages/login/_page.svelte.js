import { c as create_ssr_component, v as validate_component, a as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/api.service.js";
import { g as getToastStore } from "../../../chunks/stores.js";
import "../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { S as Stepper, a as Step } from "../../../chunks/Step.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getToastStore();
  let email = "", password = "";
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="space-y-10 text-center flex flex-col items-center"><h1 class="text-3xl" data-svelte-h="svelte-2la02n">Login</h1> <div class="w-full card p-6 text-token m-3">${validate_component(Stepper, "Stepper").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Step, "Step").$$render($$result, {}, {}, {
        header: () => {
          return `Email`;
        },
        default: () => {
          return `<input required class="input" type="email" placeholder="Email"${add_attribute("value", email, 0)}>`;
        }
      })} ${validate_component(Step, "Step").$$render($$result, {}, {}, {
        header: () => {
          return `Password`;
        },
        default: () => {
          return `<input required class="input" type="password" placeholder="Password"${add_attribute("value", password, 0)}>`;
        }
      })}`;
    }
  })}</div></div> </div>`;
});
export {
  Page as default
};

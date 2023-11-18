import { c as create_ssr_component, v as validate_component, a as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/api.service.js";
import { g as getToastStore } from "../../../chunks/stores.js";
import "../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { S as Stepper, a as Step } from "../../../chunks/Step.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getToastStore();
  let email = "", password = "", confirmationPassword = "", firstName = "", lastName = "", dateOfBirth = "";
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="space-y-10 text-center flex flex-col items-center"><div class="w-full card p-6 text-token m-3">${validate_component(Stepper, "Stepper").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Step, "Step").$$render($$result, {}, {}, {
        header: () => {
          return `Account Details`;
        },
        default: () => {
          return `<input required class="input" type="email" placeholder="Email"${add_attribute("value", email, 0)}> <input required class="input" type="password" placeholder="Password"${add_attribute("value", password, 0)}> <input required class="input" type="password" placeholder="Confirmation Password"${add_attribute("value", confirmationPassword, 0)}>`;
        }
      })} ${validate_component(Step, "Step").$$render($$result, {}, {}, {
        header: () => {
          return `User Information`;
        },
        default: () => {
          return `<label class="label"><span data-svelte-h="svelte-1nmk7y7">First Name</span> <input class="input" type="text" placeholder="First Name"${add_attribute("value", firstName, 0)}></label> <label class="label"><span data-svelte-h="svelte-cjy9jj">Last Name</span> <input class="input" type="text" placeholder="Last Name"${add_attribute("value", lastName, 0)}></label> <label class="label"><span data-svelte-h="svelte-1bfukcj">Gender</span> <select class="select"><option value="male" data-svelte-h="svelte-8wnvoi">Male</option><option value="female" data-svelte-h="svelte-kgyr86">Female</option></select></label> <label class="label"><span data-svelte-h="svelte-1mtqgri">Date of Birth</span> <input class="input" title="Input (date)" type="date"${add_attribute("value", dateOfBirth, 0)}></label>`;
        }
      })}`;
    }
  })}</div></div> </div>`;
});
export {
  Page as default
};

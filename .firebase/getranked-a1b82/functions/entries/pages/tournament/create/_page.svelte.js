import { c as create_ssr_component, v as validate_component, a as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import "../../../../chunks/api.service.js";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import { S as Stepper, a as Step } from "../../../../chunks/Step.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tournamentName, startDate, endDate, lastRegisterDate, categories, location, noOfCourts;
  return `<div class="container h-full mx-auto flex justify-center items-center"><div class="space-y-10 text-center flex flex-col items-center"><h1 class="text-3xl" data-svelte-h="svelte-h26ug5">Create Tournament</h1> <div class="w-full card p-6 text-token m-3">${validate_component(Stepper, "Stepper").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Step, "Step").$$render($$result, {}, {}, {
        header: () => {
          return `Tournament Details`;
        },
        default: () => {
          return `<input required class="input" type="text" placeholder="Tournament Name"${add_attribute("value", tournamentName, 0)}> <label class="label"><span data-svelte-h="svelte-leucv8">Sport</span> <select required class="select"><option value="squash" data-svelte-h="svelte-1yr2p2i">Squash</option></select></label> <label class="label"><span data-svelte-h="svelte-12grs2q">Type</span> <select required class="select"><option value="circuit" data-svelte-h="svelte-12hww8c">Circuit</option></select></label>`;
        }
      })} ${validate_component(Step, "Step").$$render($$result, {}, {}, {
        header: () => {
          return `Dates`;
        },
        default: () => {
          return `<label class="label"><span data-svelte-h="svelte-ap15ea">Start Date</span> <input class="input" title="Start Date" type="datetime-local"${add_attribute("value", startDate, 0)}></label> <label class="label"><span data-svelte-h="svelte-oowyo5">End Date</span> <input class="input" title="Start Date" type="datetime-local"${add_attribute("value", endDate, 0)}></label> <label class="label"><span data-svelte-h="svelte-1uos0sm">Last Day to Register</span> <input class="input" title="Last Day to Register" type="datetime-local"${add_attribute("value", lastRegisterDate, 0)}></label>`;
        }
      })} ${validate_component(Step, "Step").$$render($$result, {}, {}, {
        header: () => {
          return `Tournament Details`;
        },
        default: () => {
          return `<textarea class="textarea" rows="4" placeholder="Tournament Regulations">${escape("")}</textarea> <label class="label"><span data-svelte-h="svelte-26w7gg">Categories (separated by comma &quot;,&quot;)</span> <input required class="input" type="text" placeholder="Categories"${add_attribute("value", categories, 0)}></label>`;
        }
      })} ${validate_component(Step, "Step").$$render($$result, {}, {}, {
        header: () => {
          return `Tournament Location`;
        },
        default: () => {
          return `<label class="label"><span data-svelte-h="svelte-ygjg5s">Location Name</span> <input required class="input" type="text" placeholder="Location Name"${add_attribute("value", location, 0)}></label> <label class="label"><span data-svelte-h="svelte-knrql1">Location Address</span> <textarea required class="textarea" rows="4" placeholder="Location Address">${escape("")}</textarea></label> <label class="label"><span data-svelte-h="svelte-4gqv1k">Number of Courts</span> <input class="input" title="Number of Courts" type="number"${add_attribute("value", noOfCourts, 0)}></label>`;
        }
      })}`;
    }
  })}</div></div> </div>`;
});
export {
  Page as default
};

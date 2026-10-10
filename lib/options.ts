import { type Budget, budgetLabels, locationLabel, projects } from "./projects";

type Option = { value: string; label: string };

/** Budget bands for the enquiry form. Labels only, never currency. */
export const budgetOptions: Option[] = (Object.keys(budgetLabels) as Budget[]).map((b) => ({ value: b, label: budgetLabels[b] }));

/** Every place a Goyals Group project stands, for the enquiry form's location choice. */
export function locationOptions(): Option[] {
  const labels = [...new Set(projects.map((p) => locationLabel(p)))];
  return labels.map((label) => ({ value: label.toLowerCase().replace(/[^a-z]+/g, "-"), label }));
}

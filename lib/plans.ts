// Single source of truth for plans. Used by the Lemon Squeezy webhook and the dashboard.
export type PlanId = 'hobby' | 'pro' | 'teams';

// Monthly compute credits per plan. Adjust here and nowhere else.
export const PLAN_CREDITS: Record<PlanId, number> = {
  hobby: 1000,
  pro: 50000,
  teams: 500000,
};

const PRO_VARIANT = process.env.LEMON_PRO_VARIANT_ID;
const TEAMS_VARIANT = process.env.LEMON_TEAMS_VARIANT_ID;

/** True once both variant IDs are set in the environment. */
export const variantMappingConfigured = Boolean(PRO_VARIANT && TEAMS_VARIANT);

/** Maps a Lemon Squeezy variant ID to a plan. Returns null if it is not one of ours. */
export function planFromVariant(variantId: string | number | null | undefined): PlanId | null {
  if (variantId === null || variantId === undefined) return null;
  const v = String(variantId);
  if (PRO_VARIANT && v === PRO_VARIANT) return 'pro';
  if (TEAMS_VARIANT && v === TEAMS_VARIANT) return 'teams';
  return null;
}

import { get, patch } from "../api/tools";

export const getActivitiesService = async () => {
  const result = await get("/activities");
  return result;
};

export const archiveActivityService = async (call_id, archive) => {
  const result = await patch(`/activities/${call_id}`, {
    is_archived: archive,
  });
  return result;
};

export const resetActivityService = async () => {
  const result = await patch(`/reset`);
  return result;
};
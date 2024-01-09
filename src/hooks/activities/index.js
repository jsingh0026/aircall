import { useEffect, useState } from "react";
import {
  archiveActivityService,
  getActivitiesService,
  resetActivityService,
} from "../../services/activities";

const dataMapCache = new Map();
const cacheKey = "ACTIVITIES_CACHE";

export default function useActivities(isArchivedTab) {
  const [isLoading, setIsLoading] = useState(false);
  const [callId, setCallId] = useState(0);
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState("");

  const getActivitiesdata = async () => {
    if (!dataMapCache.has(cacheKey)) {
      dataMapCache.set(cacheKey, await getActivitiesService());
    }
    return dataMapCache.get(cacheKey);
  };
  const clearCache = () => {
    dataMapCache.clear();
  };
  const getActivities = async () => {
    try {
      const result = await getActivitiesdata();

      const filter = isArchivedTab;

      const activityData = result.filter((data) => {
        if (data.is_archived && filter) {
          return true;
        } else if (!data.is_archived && !filter) {
          return true;
        }
        return false;
      });

      setData(activityData.reverse());
      setIsLoading(false);

      // Clear Cache periodically
      const timeoutId = setTimeout(() => {
        clearCache();
      }, 900000); // after every 15 mins
      return () => clearTimeout(timeoutId);
      
    } catch (error) {
      clearCache();
      setServerError(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getActivities();
  }, [isArchivedTab, callId]);

  const archive = async (callId) => {
    try {
      const restult = await archiveActivityService(
        callId,
        isArchivedTab ? false : true
      );
      clearCache();
      setCallId(callId);
      return restult;
    } catch (error) {
      return false;
    }
  };
  const archiveAll = async () => {
    clearCache();
    if (isArchivedTab) {
      Promise.all(await resetActivityService()).finally(() => getActivities());
    } else {
      Promise.all(
        data.map(async (call) => await archiveActivityService(call.id, true))
      )
        .catch((error) => setServerError("Error archiving call(s)"))
        .finally(() => getActivities());
    }
  };
  return {
    isLoading,
    data,
    serverError,
    archive,
    archiveAll,
  };
}

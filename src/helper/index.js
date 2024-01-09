export const getDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

// Function to combine objects with the same day
export const combineObjectsByDay = (array) => {
  const result = {};
  array.forEach((obj) => {
    if (!Array.isArray(obj)) {
      const day = obj.created_at.split("T")[0];
      if (!result[day]) {
        result[day] = [obj];
      } else {
        result[day].push(obj);
      }
    }
  });
  function combineObjectsByToAndFrom(inputData) {
    const combinedObjects = {};
    for (const date in inputData) {
      inputData[date].forEach((call) => {
        const key = `${call.from}_${call.to}`;
        if (!combinedObjects[date]) {
          combinedObjects[date] = {};
        }
        if (!combinedObjects[date][key]) {
          combinedObjects[date][key] = [];
        }
        combinedObjects[date][key].push(call);
      });
    }

    return combinedObjects;
  }
  const formattedData = combineObjectsByToAndFrom(result);
  return formattedData;
};

function formatNumberWithLeadingZero(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

export function secondsToMinutesAndSecondsFormatted(seconds) {
  if (typeof seconds !== "number" || isNaN(seconds) || seconds < 0) {
    throw new Error("Input must be a non-negative number.");
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return {
    minutes: formatNumberWithLeadingZero(minutes),
    seconds: formatNumberWithLeadingZero(remainingSeconds),
  };
}

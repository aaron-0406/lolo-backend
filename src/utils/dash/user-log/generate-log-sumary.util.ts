interface LogSummaryOptions {
  method: string;
  oldData?: { [key: string]: any } | any[];
  newData?: { [key: string]: any } | any[];
  withoutChanges?: { [key: string]: any } | any[];
  name?: string;
  id?: string | number;
}

const formatDate = (date: any): string => {
  const d = new Date(date);
  return d.toISOString();
};

const isDate = (value: any): boolean => {
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  if (typeof value === "string") {
    const date = new Date(value);
    return !isNaN(date.getTime()) && value.includes("-");
  }

  return false;
};

export const generateLogSummary = ({
  method,
  oldData,
  newData,
  withoutChanges,
  name,
  id,
}: LogSummaryOptions): string => {
  let summary = `${method}\n`;
  let changes: string[] = [];

  switch (method.toUpperCase()) {
    case "POST":
      summary += `${id}\n`;
      if (
        newData &&
        !oldData &&
        !withoutChanges &&
        !Array.isArray(newData) &&
        !Array.isArray(withoutChanges) &&
        !Array.isArray(oldData)
      ) {
        for (const key in newData) {
          let newValue = newData[key];
          if (isDate(newValue)) {
            newValue = formatDate(newValue);
          }
          changes.push(JSON.stringify({ key, newValue }));
        }
      } else if (
        oldData &&
        !newData &&
        !withoutChanges &&
        !Array.isArray(oldData) &&
        !Array.isArray(newData) &&
        !Array.isArray(withoutChanges)
      ) {
        for (const key in oldData) {
          let oldValue = oldData[key];
          if (isDate(oldValue)) {
            oldValue = formatDate(oldValue);
          }
          changes.push(JSON.stringify({ key, oldValue }));
        }
      } else if (
        newData &&
        oldData &&
        withoutChanges &&
        Array.isArray(newData) &&
        Array.isArray(oldData) &&
        Array.isArray(withoutChanges)
      ) {
        changes.push(
          JSON.stringify({
            oldValue: oldData,
            newValue: newData,
            withoutChanges,
          })
        );
      }
      break;
    case "PUT":
      summary += `${id}\n`;
      if (
        newData &&
        oldData &&
        !Array.isArray(newData) &&
        !Array.isArray(oldData)
      ) {
        for (const key in newData) {
          let oldValue = oldData[key];
          let newValue = newData[key];

          if (isDate(oldValue) && isDate(newValue)) {
            oldValue = formatDate(oldValue);
            newValue = formatDate(newValue);
          }

          if (newValue !== oldValue) {
            changes.push(JSON.stringify({ key, oldValue, newValue }));
          }
        }
      } else if (
        newData &&
        oldData &&
        withoutChanges &&
        Array.isArray(newData) &&
        Array.isArray(oldData) &&
        Array.isArray(withoutChanges)
      ) {
        changes.push(
          JSON.stringify({
            oldValue: oldData,
            newValue: newData,
            withoutChanges,
          })
        );
      }
      break;

    case "PATCH":
      summary += `${id}\n`;
      if (
        newData &&
        oldData &&
        !Array.isArray(newData) &&
        !Array.isArray(oldData)
      ) {
        for (const key in newData) {
          let oldValue = oldData[key];
          let newValue = newData[key];

          if (isDate(oldValue) && isDate(newValue)) {
            oldValue = formatDate(oldValue);
            newValue = formatDate(newValue);
          }

          if (newValue !== oldValue) {
            changes.push(JSON.stringify({ key, oldValue, newValue }));
          }
        }
      }
      else if (
        newData &&
        oldData &&
        withoutChanges &&
        Array.isArray(newData) &&
        Array.isArray(oldData) &&
        Array.isArray(withoutChanges)
      ) {
        changes.push(
          JSON.stringify({
            oldValue: oldData,
            newValue: newData,
            withoutChanges,
          })
        );
      }
      break;
    case "DELETE":
      summary += `${id}\n`;
      if (oldData && !Array.isArray(oldData)) {
        for (const key in oldData) {
          let oldValue = oldData[key];
          if (isDate(oldValue)) {
            oldValue = formatDate(oldValue);
          }
          changes.push(JSON.stringify({ key, oldValue }));
        }
      }
      break;
    default:
      summary += `Método desconocido: ${method}\n`;
  }

  if (changes.length > 0) {
    summary += `CHANGES\n${changes.join("\n")}`;
  }

  return summary;
};
;

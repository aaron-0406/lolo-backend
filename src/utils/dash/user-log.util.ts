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
  return value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)));
};

const generateLogSummary = ({ method, oldData, newData, withoutChanges, name, id }: LogSummaryOptions): string => {
  let summary = `${method}\n`;
  let changes: string[] = [];

  switch (method.toUpperCase()) {
    case 'POST':
      summary += `${id}\n`;
      const dataPost = newData;
      if (!Array.isArray(dataPost)) {
        for (const key in dataPost) {
          let newValue = dataPost[key];
          if (isDate(newValue)) {
            newValue = formatDate(newValue);
          }
          changes.push(JSON.stringify({ key, newValue }));
        }
      }
      if (Array.isArray(dataPost)) {
        changes.push(JSON.stringify({ oldValue: oldData, newValue: newData, withoutChanges: withoutChanges }));
      }
      break;
    case 'PUT':
    case 'PATCH':
      summary += `${id}\n`;
      if (!Array.isArray(newData) && !Array.isArray(oldData)) {
        for (const key in newData) {
          let oldValue = oldData?.[key];
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
      break;
    case 'DELETE':
      summary += `${id}\n`;
      const dataDelete = oldData;
      if (!Array.isArray(dataDelete)) {
        for (const key in dataDelete) {
          let oldValue = dataDelete[key];
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
    summary += `CHANGES\n${changes.join('\n')}`;
  }

  return summary;
};

export default { generateLogSummary };
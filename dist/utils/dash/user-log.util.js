"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString();
};
const isDate = (value) => {
    if (value instanceof Date) {
        return !isNaN(value.getTime());
    }
    if (typeof value === "string") {
        const date = new Date(value);
        return !isNaN(date.getTime()) && value.includes("-");
    }
    return false;
};
const generateLogSummary = ({ method, oldData, newData, withoutChanges, name, id, }) => {
    let summary = `${method}\n`;
    let changes = [];
    switch (method.toUpperCase()) {
        case "POST":
            summary += `${id}\n`;
            if (newData && !Array.isArray(newData)) {
                for (const key in newData) {
                    let newValue = newData[key];
                    if (isDate(newValue)) {
                        newValue = formatDate(newValue);
                    }
                    changes.push(JSON.stringify({ key, newValue }));
                }
            }
            else if (Array.isArray(newData)) {
                changes.push(JSON.stringify({
                    oldValue: oldData,
                    newValue: newData,
                    withoutChanges,
                }));
            }
            break;
        case "PUT":
        case "PATCH":
            summary += `${id}\n`;
            if (newData &&
                oldData &&
                !Array.isArray(newData) &&
                !Array.isArray(oldData)) {
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
exports.default = { generateLogSummary };

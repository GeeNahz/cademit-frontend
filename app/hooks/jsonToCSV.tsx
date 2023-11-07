import exportFromJSON from "export-from-json";


export function exportDataToCSV(data: {[key: string]: any}[], fileName: string) {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
}

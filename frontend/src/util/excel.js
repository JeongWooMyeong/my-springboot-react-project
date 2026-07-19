import * as XLSX from "xlsx";

export function readExcel(file, canvasData) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = (e) => {

            try {

                const workbook = XLSX.read(
                    e.target.result,
                    {
                        type: "array"
                    }
                );

                const sheet =
                    workbook.Sheets[
                        workbook.SheetNames[0]
                        ];

                const rows =
                    XLSX.utils.sheet_to_json(
                        sheet,
                        {
                            defval: ""
                        }
                    );

                if (rows.length === 0) {
                    reject(new Error("엑셀 데이터가 없습니다."));
                    return;
                }

                const excelData = rows[0];

                const result = {};

                canvasData.forEach(field => {

                    const key = field.fieldName;

                    if (excelData[key] !== undefined) {
                        result[key] = excelData[key];
                    }

                });

                resolve(result);

            } catch (e) {

                reject(e);

            }

        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);

    });

}
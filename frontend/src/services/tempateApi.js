import axios from "axios";

export function dataURLToBlob(dataURL) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}


function createFormData({
                            stageRef,
                            title,
                            elements,
                            papersize,
                            paperwidth,
                            paperheight,
                            clcd,
                            id
                        }) {

    const thumbnailDataUrl =
        stageRef.current.toDataURL({
            pixelRatio: 0.3
        });

    const blob = dataURLToBlob(thumbnailDataUrl);


    const payload = {
        id,
        title,
        canvasData: JSON.stringify(elements),
        papersize,
        paperwidth,
        paperheight,
        clcd,
        active: true
    };


    const formData = new FormData();

    formData.append(
        "template",
        new Blob(
            [JSON.stringify(payload)],
            {
                type: "application/json"
            }
        )
    );

    formData.append(
        "thumbnail",
        blob,
        "thumbnail.png"
    );


    return formData;
}


// 신규 저장
export async function saveTemplate(params) {

    const formData = createFormData(params);

    return axios.post(
        "/api/sytm2000",
        formData
    );
}


// 수정
export async function updateTemplate(id, params) {

    const formData = createFormData({
        ...params,
        id
    });

    return axios.put(
        `/api/sytm2000/${id}`,
        formData
    );
}
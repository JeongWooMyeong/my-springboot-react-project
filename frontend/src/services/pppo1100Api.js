export async function getTemplate(templateid) {

    const res = await fetch(
        `/api/sytm2000/${templateid}`
    );

    if (!res.ok) {
        throw new Error("템플릿 조회 실패");
    }

    const data = await res.json();

    return {
        ...data,
        canvasData: JSON.parse(data.canvasData)
    };

}

export async function uploadImage(file, token) {

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch(
        "/api/pppo1000/upload/image",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        }
    );

    if (!res.ok) {
        throw new Error("이미지 업로드 실패");
    }

    return await res.json();

}

export async function saveProduct(payload, token) {

    const res = await fetch(
        "/api/pppo1000",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
    );

    if (!res.ok) {
        throw new Error("저장 실패");
    }

    return await res.text();

}
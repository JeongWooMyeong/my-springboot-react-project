import { useState, useEffect } from "react";

export function useCategories(token, parentId) {
    const [list, setList] = useState([]);

    useEffect(() => {
        if (!token || parentId === null) {
            setList([]); // parentId 없으면 빈 배열 반환
            return;
        }

        fetch(`/api/sytm2000/categories?parent=${parentId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setList(data))
            .catch(() => setList([]));
    }, [token, parentId]);

    return list;
}

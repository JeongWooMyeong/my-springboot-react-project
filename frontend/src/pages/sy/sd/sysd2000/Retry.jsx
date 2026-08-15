import React, { useState } from "react";
import { retry } from "../../../../services/sysd2000Api";

function Retry({
                   id,
                   onSuccess
               }) {

    const [loading, setLoading] = useState(false);

    const handleRetry = async () => {

        if (!window.confirm(
            `상품 ID ${id}의 실패 이벤트를 재처리하시겠습니까?`
        )) {
            return;
        }

        try {
            setLoading(true);

            await retry(id);

            alert("재처리가 완료되었습니다.");

            if (onSuccess) {
                await onSuccess();
            }

        } catch (error) {
            console.error(error);
            alert("재처리에 실패했습니다.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            disabled={loading}
            onClick={handleRetry}
        >
            {loading ? "처리 중..." : "재처리"}
        </button>
    );
}

export default Retry;
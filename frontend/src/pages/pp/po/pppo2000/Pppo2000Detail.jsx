import TemplatePreview from "../../../components/TemplatePreview/TemplatePreview.jsx";

export default function Pppo2000Detail({ detail }) {
    if (!detail) {
        return (
            <div style={{ flex:1, minHeight:700, border:"1px solid #ddd", padding:20 }}>
                미리보기 상세 데이터가 없습니다.
            </div>
        );
    }
    return <TemplatePreview request={detail} />;
}

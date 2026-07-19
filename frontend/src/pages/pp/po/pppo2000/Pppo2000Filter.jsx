import { Form, Select, Button } from "antd";
import JijumInlineSelect from "../../../components/JijumInlineSelect.jsx";

export default function Pppo2000Filter({ form, status, setStatus, onSearch }) {
    return (
        <Form form={form} layout="inline" style={{ marginBottom: 20 }}>
            <JijumInlineSelect form={form} />
            <Form.Item label="신청상태" name="status" initialValue="">
                <Select value={status} onChange={val => setStatus(val)} style={{ width: 150 }}>
                    <Select.Option value="">전체</Select.Option>
                    <Select.Option value="10">신청</Select.Option>
                    <Select.Option value="20">승인</Select.Option>
                    <Select.Option value="30">반려</Select.Option>
                </Select>
            </Form.Item>
            <Button type="primary" onClick={onSearch}>조회</Button>
        </Form>
    );
}

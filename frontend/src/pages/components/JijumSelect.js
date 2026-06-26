import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default function JijumSelect({ form }) {
    const [jijumList, setJijumList] = useState([]);
    const [company, setCompany] = useState(null);
    const [branch, setBranch] = useState(null);

    useEffect(() => {
        axios.get("/api/jijum").then(res => setJijumList(res.data));
    }, []);

    const companies = jijumList.filter(j => j.jijumclcd === "0"); // 최상위 회사
    const branches = jijumList.filter(j => j.jijumclcd === company); // 회사 하위 지점
    const teams = jijumList.filter(j => j.jijumclcd === branch); // 지점 하위 팀

    return (
        <>
            <Form.Item label="회사 선택" name="company" rules={[{ required: true }]}>
                <Select onChange={setCompany} placeholder="회사 선택">
                    {companies.map(c => (
                        <Select.Option key={c.jijumcd} value={c.jijumcd}>
                            {c.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="지점 선택" name="branch" rules={[{ required: true }]}>
                <Select onChange={setBranch} placeholder="지점 선택" disabled={!company}>
                    {branches.map(b => (
                        <Select.Option key={b.jijumcd} value={b.jijumcd}>
                            {b.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="팀 선택" name="team" rules={[{ required: true }]}>
                <Select placeholder="팀 선택" disabled={!branch}>
                    {teams.map(t => (
                        <Select.Option key={t.jijumcd} value={t.jijumcd}>
                            {t.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    );
}

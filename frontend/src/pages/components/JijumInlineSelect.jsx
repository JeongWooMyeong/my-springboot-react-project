import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default function JijumInlineSelect({ form }) {
    const [jijumList, setJijumList] = useState([]);
    const [company, setCompany] = useState("ALL");
    const [branch, setBranch] = useState("ALL");
    const [team, setTeam] = useState("ALL");
    const [part, setPart] = useState("ALL");

    useEffect(() => {
        axios.get("/api/jijum")
            .then(res => setJijumList(res.data))
            .catch(err => console.error(err));

        // 기본값 세팅
        form.setFieldsValue({
            company: "ALL",
            branch: "ALL",
            team: "ALL",
            part: "ALL",
            jijumcd: "ALL"
        });
    }, [form]);

    // 최종 jijumcd 갱신 로직
    const updateJijumCd = (level, value) => {
        if (level === "company") {
            setCompany(value);
            setBranch("ALL");
            setTeam("ALL");
            setPart("ALL");
        } else if (level === "branch") {
            setBranch(value);
            setTeam("ALL");
            setPart("ALL");
        } else if (level === "team") {
            setTeam(value);
            setPart("ALL");
        } else if (level === "part") {
            setPart(value);
        }

        let finalCd = value;
        if (value === "ALL") {
            if (level === "part" && team && team !== "ALL") finalCd = team;
            else if (level === "team" && branch && branch !== "ALL") finalCd = branch;
            else if (level === "branch" && company && company !== "ALL") finalCd = company;
            else finalCd = "ALL";
        }

        form.setFieldsValue({ jijumcd: finalCd });
    };

    const companies = jijumList.filter(j => j.jijumclcd === "0");
    const branches = company && company !== "ALL" ? jijumList.filter(j => j.jijumclcd === company) : [];
    const teams = branch && branch !== "ALL" ? jijumList.filter(j => j.jijumclcd === branch) : [];
    const parts = team && team !== "ALL" ? jijumList.filter(j => j.jijumclcd === team) : [];

    return (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Form.Item name="company" label="회사" style={{ width: 150 }} initialValue="ALL">
                <Select onChange={val => updateJijumCd("company", val)} placeholder="회사">
                    <Select.Option value="ALL">전체</Select.Option>
                    {companies.map(c => (
                        <Select.Option key={c.jijumcd} value={c.jijumcd}>
                            {c.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="branch" label="지점" style={{ width: 150 }} initialValue="ALL">
                <Select onChange={val => updateJijumCd("branch", val)} placeholder="지점" disabled={!company || company === "ALL"}>
                    <Select.Option value="ALL">전체</Select.Option>
                    {branches.map(b => (
                        <Select.Option key={b.jijumcd} value={b.jijumcd}>
                            {b.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="team" label="팀" style={{ width: 150 }} initialValue="ALL">
                <Select onChange={val => updateJijumCd("team", val)} placeholder="팀" disabled={!branch || branch === "ALL"}>
                    <Select.Option value="ALL">전체</Select.Option>
                    {teams.map(t => (
                        <Select.Option key={t.jijumcd} value={t.jijumcd}>
                            {t.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="part" label="파트" style={{ width: 150 }} initialValue="ALL">
                <Select onChange={val => updateJijumCd("part", val)} placeholder="파트" disabled={!team || team === "ALL"}>
                    <Select.Option value="ALL">전체</Select.Option>
                    {parts.map(p => (
                        <Select.Option key={p.jijumcd} value={p.jijumcd}>
                            {p.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="jijumcd" hidden initialValue="ALL">
                <input type="hidden" />
            </Form.Item>
        </div>
    );
}

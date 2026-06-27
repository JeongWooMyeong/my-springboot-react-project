import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import axios from "axios";

export default function JijumSelect({ form, initialJijumCd  }) {
    const [jijumList, setJijumList] = useState([]);
    const [company, setCompany] = useState(null);
    const [branch, setBranch] = useState(null);
    const [team, setTeam] = useState(null);
    const [part, setPart] = useState(null);

    useEffect(() => {
        axios.get("/api/jijum").then(res => setJijumList(res.data));
    }, []);

    useEffect(() => {
        if (initialJijumCd && jijumList.length > 0) {
            const selected = jijumList.find(j => j.jijumcd === initialJijumCd);
            if (!selected) return;

            let companyVal = null, branchVal = null, teamVal = null, partVal = null;

            // 회사
            if (selected.jijumclcd === "0") {
                companyVal = selected.jijumcd;
            } else {
                const parent = jijumList.find(j => j.jijumcd === selected.jijumclcd);

                // 지점
                if (parent?.jijumclcd === "0") {
                    branchVal = selected.jijumcd;
                    companyVal = parent.jijumcd;
                } else {
                    const grandParent = jijumList.find(j => j.jijumcd === parent.jijumclcd);

                    // 팀
                    if (grandParent?.jijumclcd === "0") {
                        teamVal = selected.jijumcd;
                        branchVal = parent.jijumcd;
                        companyVal = grandParent.jijumcd;
                    } else {
                        // 파트
                        partVal = selected.jijumcd;
                        teamVal = parent.jijumcd;
                        branchVal = grandParent.jijumcd;
                        companyVal = jijumList.find(j => j.jijumcd === branchVal)?.jijumclcd;
                    }
                }
            }

            // 상태 세팅
            setCompany(companyVal);
            setBranch(branchVal);
            setTeam(teamVal);
            setPart(partVal);

            // 폼 값 세팅
            form.setFieldsValue({
                company: companyVal,
                branch: branchVal,
                team: teamVal,
                part: partVal,
                jijumcd: partVal || teamVal || branchVal || companyVal
            });
        }
    }, [initialJijumCd, jijumList]);

    const companies = jijumList.filter(j => j.jijumclcd === "0");
    const branches = company ? jijumList.filter(j => j.jijumclcd === company) : [];
    const teams = branch ? jijumList.filter(j => j.jijumclcd === branch) : [];
    const parts = team ? jijumList.filter(j => j.jijumclcd === team) : [];

    // 최종 선택된 jijumcd 계산
    const updateFinalJijumCd = (companyVal, branchVal, teamVal, partVal) => {
        const finalJijumCd = partVal || teamVal || branchVal || companyVal;
        form.setFieldsValue({ jijumcd: finalJijumCd });
    };

    const handleCompanyChange = (value) => {
        setCompany(value);
        setBranch(null);
        setTeam(null);
        setPart(null);
        updateFinalJijumCd(value, null, null, null);
    };

    const handleBranchChange = (value) => {
        setBranch(value);
        setTeam(null);
        setPart(null);
        updateFinalJijumCd(company, value, null, null);
    };

    const handleTeamChange = (value) => {
        setTeam(value);
        setPart(null);
        updateFinalJijumCd(company, branch, value, null);
    };

    const handlePartChange = (value) => {
        setPart(value);
        updateFinalJijumCd(company, branch, team, value);
    };

    return (
        <>
            <Form.Item label="회사 선택" name="company" rules={[{ required: true }]}>
                <Select onChange={handleCompanyChange} placeholder="회사 선택">
                    {companies.map(c => (
                        <Select.Option key={c.jijumcd} value={c.jijumcd}>
                            {c.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="지점 선택" name="branch" rules={[{ required: true }]}>
                <Select onChange={handleBranchChange} placeholder="지점 선택" disabled={!company}>
                    {branches.map(b => (
                        <Select.Option key={b.jijumcd} value={b.jijumcd}>
                            {b.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="팀 선택" name="team">
                <Select onChange={handleTeamChange} placeholder="팀 선택" disabled={!branch}>
                    {teams.map(t => (
                        <Select.Option key={t.jijumcd} value={t.jijumcd}>
                            {t.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="파트 선택" name="part">
                <Select onChange={handlePartChange} placeholder="파트 선택" disabled={!team}>
                    {parts.map(p => (
                        <Select.Option key={p.jijumcd} value={p.jijumcd}>
                            {p.jijumname}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="jijumcd" hidden>
                <input type="hidden" />
            </Form.Item>
        </>
    );
}

import React from "react";
import {
    Form,
    Input,
    Select,
    Button
} from "antd";


export default function UserSearch({
                                       form,
                                       selectedUserIds = [],
                                       onSearch,
                                       onRegister,
                                       onEdit,
                                       onDelete
                                   }) {

    return (
        <Form
            form={form}
            layout="inline"
            style={{
                marginBottom: 16
            }}
        >

            <Form.Item
                name="searchField"
                initialValue="userid"
            >
                <Select
                    style={{
                        width:150
                    }}
                >
                    <Select.Option value="userid">
                        User ID
                    </Select.Option>

                    <Select.Option value="username">
                        User Name
                    </Select.Option>

                </Select>

            </Form.Item>


            <Form.Item
                name="searchValue"
            >
                <Input
                    placeholder="검색어 입력"
                    style={{
                        width:200
                    }}
                    onPressEnter={onSearch}
                />
            </Form.Item>



            <Form.Item
                name="useean"
                initialValue=""
            >
                <Select
                    style={{
                        width:150
                    }}
                >

                    <Select.Option value="">
                        전체
                    </Select.Option>

                    <Select.Option value="Y">
                        사용
                    </Select.Option>

                    <Select.Option value="N">
                        미사용
                    </Select.Option>

                </Select>

            </Form.Item>



            <Form.Item>

                <Button
                    type="primary"
                    onClick={onSearch}
                >
                    조회
                </Button>

            </Form.Item>



            <Form.Item
                style={{
                    marginLeft:8
                }}
            >

                <Button
                    onClick={onRegister}
                >
                    사용자 등록
                </Button>

            </Form.Item>



            <Form.Item
                style={{
                    marginLeft:8
                }}
            >

                <Button
                    disabled={
                        selectedUserIds.length !== 1
                    }
                    onClick={onEdit}
                >
                    사용자 수정
                </Button>

            </Form.Item>



            <Form.Item
                style={{
                    marginLeft:8
                }}
            >

                <Button
                    danger
                    disabled={
                        selectedUserIds.length === 0
                    }
                    onClick={onDelete}
                >
                    사용자 삭제
                </Button>

            </Form.Item>


        </Form>
    );
}
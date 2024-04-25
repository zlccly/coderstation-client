import { useRef, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import styles from "../css/AddIssue.module.css";
import { useSelector } from "react-redux";
import { typeOptionCreator } from "../utils/tools";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
function AddIssue(props) {
  const formRef = useRef();
  const editorRef = useRef();
  const [issueInfo, setIssueInfo] = useState({
    issueTitle: "",
    issueContent: "",
    userId: "",
    typeId: "",
  });
  const { typeList } = useSelector((state) => state.type);

  function updateInfo(newContent, key) {
    setIssueInfo({
      ...issueInfo,
      [key]: newContent,
    });
  }

  function handleChange() {}
  // 提交问答
  function addHandle() {}
  return (
    <div className={styles.container}>
      <Form
        name="basic"
        initialValues={issueInfo}
        autoComplete="off"
        ref={formRef}
        onFinish={addHandle}
      >
        {/* 问答标题 */}
        <Form.Item
          label="标题"
          name="issueTitle"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input
            placeholder="请输入标题"
            size="large"
            value={issueInfo.issueTitle}
            onChange={(e) => updateInfo(e.target.value, "issueTitle")}
          />
        </Form.Item>

        {/* 问题类型 */}
        <Form.Item
          label="问题分类"
          name="typeId"
          rules={[{ required: true, message: "请选择问题所属分类" }]}
        >
          <Select style={{ width: 200 }} onChange={handleChange}>
            {typeOptionCreator(Select, typeList)}
          </Select>
        </Form.Item>

        {/* 问答内容 */}
        <Form.Item
          label="问题描述"
          name="issueContent"
          rules={[{ required: true, message: "请输入问题描述" }]}
        >
          <Editor
            initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            language="zh-CN"
            ref={editorRef}
          />
        </Form.Item>

        {/* 确认按钮 */}
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确认新增
          </Button>

          <Button type="link" htmlType="submit" className="resetBtn">
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddIssue;

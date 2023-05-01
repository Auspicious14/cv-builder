import React, { useState } from "react";
import { DeleteOutlined, PlusOutlined, StarOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile } from "antd/es/upload";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    console.log(reader);
  });

interface IProps {
  fileList?: any;
  handleChange: (e: any) => void;
}

export const Files: React.FC<IProps> = ({ fileList, handleChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.uri || file.preview || file.thumbUrl);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.uri!.substring(file.uri!.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture"
        // fileList={fileList}
        name="file"
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={true}
        showUploadList={{
          showDownloadIcon: true,
          downloadIcon: "Download",
          showRemoveIcon: true,
        }}
      >
        {fileList?.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

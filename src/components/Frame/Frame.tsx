import { Space, Button, Upload, UploadFile } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import Konva from "konva";
import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";
import KonvaImage from "../KonvaImage/KonvaImage";
import { FolderOpenOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import "./Frame.css";

const WIDTH = 3508;
const HEIGHT = 2480;
const IMAGE_POSITIONS: Array<{ x: number, y: number }> =
  [
    {
      x: 35,
      y: 35
    },
    {
      x: 1279,
      y: 35
    },
    {
      x: 2523,
      y: 35
    },
    {
      x: 35,
      y: 2446
    },
    {
      x: 2169,
      y: 2446
    }
  ]

const Frame = () => {

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [urls, setUrls] = useState<Array<string>>([]);

  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (fileList.length > 0) {
      const urls = fileList.map((file) => URL.createObjectURL(file.originFileObj as File));
      setUrls(urls);
    } else {
      setUrls([]);
    }
  }, [fileList]);

  function onFileChange(info: UploadChangeParam<UploadFile<any>>) {
    setFileList(info.fileList);
  }

  function clearFileList() {
    setFileList([]);
    setUrls([]);
  }

  function exportImage() {
    if (stageRef.current) {
      const url = stageRef.current.toDataURL({
        quality: 1
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = "THE_TNV";
      a.click();
    }
  }

  return (
    <div>
      <Space>
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          multiple
          maxCount={5}
          accept="image/*"
          onChange={onFileChange}
        >
          {fileList.length === 0 &&
            <Button type="primary" icon={<FolderOpenOutlined />}>Chọn ảnh</Button>
          }
        </Upload>

        {fileList.length > 0 &&
          <>
            <Button type="primary" icon={<DeleteOutlined />} onClick={clearFileList}>Xóa ảnh</Button>
            <Button type="primary" icon={<DownloadOutlined />} onClick={exportImage}>Lưu ảnh</Button>
          </>
        }

      </Space>
      <Stage width={WIDTH} height={HEIGHT} className="stage" ref={stageRef}>
        <Layer>
          <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#ffffff" />
          {urls.map((url, index) => (
            <KonvaImage
              url={url}
              key={index}
              x={IMAGE_POSITIONS[index].x}
              y={IMAGE_POSITIONS[index].y}
              rotation={index > 2 ? -90 : undefined}
            />
          ))}
        </Layer>
      </Stage>
    </div >
  )
}

export default Frame;
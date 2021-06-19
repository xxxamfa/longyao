import "./App.css";
// 引入元件
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import defaultFiles from "./utils/defaultFiles";
import BottomBtn from "./components/BottomBtn";
import { faFileImport, faPlus } from "@fortawesome/free-solid-svg-icons";
import TabList from "./components/TabList";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, DatePicker, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileID, setActiveFileID] = useState("");
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const openedFiles = openedFileIDs.map((openID) => {
    return files.find((file) => file.id === openID);
  });
  const activeFile = files.find((file) => file.id === activeFileID);
  const fileClick = (fileID) => {
    setActiveFileID(fileID);
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID]);
    }
  };
  const tabClick = (fileID) => {
    setActiveFileID(fileID);
  };
  const tabClose = (id) => {
    // 把OpenedFileIDs裡的id去掉要關閉的ID
    const tabWithout = openedFileIDs.filter((fileID) => fileID !== id);
    setOpenedFileIDs(tabWithout);
    if (tabWithout.length > 0) {
      setActiveFileID(tabWithout[0]);
    } else {
      setActiveFileID("");
    }
  };
  const fileChange = (id, value) => {
    // console.log(id, value);
    const newFiles = files.map((file) => {
      if (file.id === id) {
        file.body = value;
      }
      // console.log("file", file);
      return file;
    });
    console.log("newFiles", newFiles);
    console.log("files", files);
    setFiles(newFiles);
    if (!unsavedFileIDs.includes(id)) {
      console.log("unsavedFileIDs", unsavedFileIDs);
      setUnsavedFileIDs([...unsavedFileIDs, id]);
    }
  };
  return (
    <div className="App container-fluid px-0">
      <DatePicker />
      <Tooltip title="search">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
      <Button type="primary" shape="circle">
        A
      </Button>
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
      <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
     
      
    </div>
  );
}

export default App;

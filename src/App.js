import "./App.css";
// 引入BS
import "bootstrap/dist/css/bootstrap.min.css";
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
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch
            title="我的雲文檔"
            onFileSearch={(value) => {
              console.log(value);
            }}
          />
          <FileList
            files={files}
            onFileClick={fileClick}
            onFileDelete={(id) => {
              console.log("Delete", id);
            }}
            onSaveEdit={(id, newValue) => {
              console.log(id);
              console.log(newValue);
            }}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
              ></BottomBtn>
            </div>
            <div className="col">
              <BottomBtn
                text="導入"
                colorClass="btn-success"
                icon={faFileImport}
              ></BottomBtn>
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          {!activeFile && (
            <div className="start-page">选择或者创建新的 Markdown 文档</div>
          )}
          {activeFile && (
            <>
              <TabList
                files={openedFiles}
                onTabClick={tabClick}
                activeId={activeFileID}
                onCloseTab={tabClose}
                unsaveIds={unsavedFileIDs}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => {
                  fileChange(activeFile.id, value);
                }}
                options={{ minHeight: "515px" }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

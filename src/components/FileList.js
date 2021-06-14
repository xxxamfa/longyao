import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useKeyPress from "../hooks/useKeyPress";


const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  // 是否為修改狀態與修改的值
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState("");

  // 鍵盤hook使用
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  // 關閉輸入
  const closeSearch = () => {
    // 取消默認處理
    // e.preventDefault();
    setEditStatus(false);
    setValue("");
  };
  //全域事件
  useEffect(() => {
      // enter=13 . exc=27
      if (enterPressed && editStatus) {
        const editItem = files.find((file) => file.id === editStatus);
        onSaveEdit(editItem.id, value);
        setEditStatus(false);
        setValue("");
      } else if (escPressed && editStatus) {
        closeSearch();
      }
    }
    // // 使用
    // document.addEventListener("keyup", handleInputEvent);
    // // 釋放
    // return () => {
    //   document.removeEventListener("keyup", handleInputEvent);
    // };
  );
  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => (
        <li
          className="list-group-item bg-light row d-flex align-items-center mx-0"
          key={file.id}
        >
          {file.id !== editStatus && (
            <>
              <span className="col-2">
                <FontAwesomeIcon icon={faMarkdown} size="lg" />
              </span>
              <span
                className="col-6"
                onClick={() => {
                  onFileClick(file.id);
                }}
              >
                {file.title}
              </span>
              <button
                type="button"
                className="icon-button col-2 c-link"
                onClick={() => {
                  setEditStatus(file.id);
                  setValue(file.title);
                }}
              >
                <FontAwesomeIcon icon={faEdit} size="lg" title="編輯" />
              </button>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  onFileDelete(file.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} size="lg" title="刪除" />
              </button>
            </>
          )}
          {file.id === editStatus && (
            <>
              <input
                className="form-control col-10"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={closeSearch}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" title="關閉" />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func,
};
export default FileList;

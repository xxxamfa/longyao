import React, { useEffect, useRef, useState } from "react";
// 引用FontAwesome start
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// 引用FontAwesome end

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");
  // 按搜尋時游標focus到輸入框
  let node = useRef(null);
  // method寫這
  // 關閉搜尋
  const closeSearch = (e) => {
    // 取消默認處理
    e.preventDefault();
    setInputActive(false);
    setValue("");
  };
  //全域事件
  useEffect(() => {
    const handleInputEvent = (event) => {
      const { keyCode } = event;
      // enter=13 . exc=27
      if (keyCode === 13 && inputActive) {
        onFileSearch(value);
      } else if (keyCode === 27 && inputActive) {
        closeSearch(event);
      }
    };
    // 使用
    document.addEventListener("keyup", handleInputEvent);
    // 釋放
    return () => {
      document.removeEventListener("keyup", handleInputEvent);
    };
  });
  // watch
  // focus輸入框
  useEffect(() => {
    if (inputActive) {
      node.current.focus();
    }
  }, [inputActive]);
  return (
    <div className="alert alert-primary">
      {!inputActive && (
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setInputActive(true);
            }}
          >
            <FontAwesomeIcon icon={faSearch} title="搜尋" />
          </button>
        </div>
      )}
      {/* inputActive為true就顯示後面<div>... */}
      {inputActive && (
        <div className="row">
          <input
            className="col-8"
            value={value}
            ref={node}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button
            type="button"
            className="btn btn-primary col-4"
            onClick={closeSearch}
          >
            關閉
          </button>
        </div>
      )}
    </div>
  );
};

export default FileSearch;

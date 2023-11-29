import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

const Editor = ({ setUuid, setContent1 }) => {
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append("file", file);

            axios
              .post("/api/file/ckupload", formData)
              .then((res) => {
                resolve({
                  default: res.data.ckuri,
                });
                setUuid(res.data.data.uuid);
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <Box>
      <section>
        {/*TODO : 높이 길어지면 스크롤 만들기*/}
        <CKEditor
          editor={ClassicEditor}
          data=""
          config={{ extraPlugins: [uploadPlugin] }}
          onReady={(editor) => {
            editor.ui.view.editable.element.style.minHeight = "500px";
            // You can store the "editor" and use when it is needed.
            // console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            setContent1(editor.getData());
            editor.ui.view.editable.element.style.minHeight = "500px";
            // console.log({ event, editor, content });
          }}
          onBlur={(event, editor) => {
            editor.ui.view.editable.element.style.minHeight = "500px";
            // console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            editor.ui.view.editable.element.style.minHeight = "500px";
            // console.log("Focus.", editor);
          }}
        />
      </section>
    </Box>
  );
};

export default Editor;

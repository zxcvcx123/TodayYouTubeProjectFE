import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import "./editorStyle.css"; // External CSS file

const Editor = ({ uuid, setUuid, setContent1, data }) => {
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
                setUuid(res.data.uuid);
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
        {/*TODO : focus를 벗어나도 높이가 고정되게 만들기*/}
        <CKEditor
          editor={ClassicEditor}
          data={data || ""}
          config={{ extraPlugins: [uploadPlugin] }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            setContent1(editor.getData());
            // console.log({ event, editor, content });
          }}
          onFocus={(event, editor) => {
            editor.ui.view.editable.element.style.minHeight = "500px";
          }}
        />
      </section>
    </Box>
  );
};

export default Editor;

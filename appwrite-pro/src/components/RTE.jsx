/* eslint-disable react/prop-types */
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  name,
  control,
  label,
  defaultValue = "",
  plugins = [
    "advlist autolink lists link image charmap preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table code help wordcount",
  ],
  toolbar = "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
  height = 500,
  error,
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="8iqujq438gse9pwov02jrtb504vggwv936eq0fb4yyu12qvi"
            initialValue={defaultValue}
            init={{
              height,
              menubar: true,
              plugins,
              toolbar,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              width: "100%", // Ensure the editor is full width
              max_width: "100%", // Prevents the editor from overflowing on large screens
            }}
            onEditorChange={onChange}
          />
        )}
      />
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </div>
  );
}

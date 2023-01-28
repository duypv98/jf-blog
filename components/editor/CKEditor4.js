import { forwardRef, useImperativeHandle, useState } from "react";
import { useCKEditor, CKEditorEventAction } from "ckeditor4-react";

const CKEditor = forwardRef(
  /**
   * @typedef {{
   *  editor?: any;
   * }} CKEditor4Ref
   * @param {import("react").PropsWithoutRef<{
   *  defaultValue?: string;
   *  onChange?: (value: string) => void;
   *  onBlur?: (value: string) => void;
   *  inline?: boolean;
   * }>} props
   * @param {*} ref
   */
  (props, ref) => {
    const {
      defaultValue = "",
      onChange = () => { },
      onBlur = () => { },
      inline
    } = props;
    const [value, setValue] = useState(defaultValue);
    /**
     * @type {[HTMLDivElement, import("react").Dispatch<import("react").SetStateAction<HTMLDivElement>]}
     */
    const [editor, setEditor] = useState(null);

    const { status, editor: e } = useCKEditor({
      element: editor,
      config: {
        mathJaxLib: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML",
        mathJaxClass: "mjx-latex",
        toolbar: [
          { name: 'clipboard', groups: ['clipboard', 'undo'], items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
          { name: 'document', groups: ['mode', 'document', 'doctools'], items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'] },
          {
            name: 'insert', items: [
              'Table',
              'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'
            ]
          },
          { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
          { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
          { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
          { name: 'colors', items: ['TextColor', 'BGColor'] },
          { name: 'extra', items: ['Mathjax'] }
        ],
        allowedContent: true,
        extraPlugins: 'justify,font,colorbutton,mathjax',
      },
      type: inline ? "inline" : "classic",
      subscribeTo: ["blur", "change"],
      dispatchEvent: ({ type, payload }) => {
        if (type === CKEditorEventAction.change) {
          const content = payload.editor.getData();
          setValue(content);
          onChange(content);
        } else if (type === CKEditorEventAction.blur) {
          const content = payload.editor.getData();
          setValue(content);
          onBlur(content);
        }
      }
    });

    useImperativeHandle(ref, () => ({
      editor: e
    }));

    return <div className="ckeditor-4-react-container"
      ref={setEditor}
      style={status !== "ready" ? { visibility: "hidden" } : undefined}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  }
);

export default CKEditor;
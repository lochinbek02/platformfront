import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CkEditorComponent({ initialValue, onChange }) {
    const [data, setData] = useState(initialValue || "");

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                
                data={data}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setData(data);
                    onChange(data); // O'zgargan ma'lumotni onChange orqali qaytarish
                }}
            />
        </div>
    );
}

export default CkEditorComponent;

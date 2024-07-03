
// export const modulesQuill = {
//   toolbar: [
//     // [{ 'header': [1, 2, false] }], // H1, H2, and normal text
//     // ['bold', 'italic', 'underline', 'strike'], // Basic formatting
//     // [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Ordered and bulleted lists
//     // ['link', 'image', 'video'], // Link, image, and video insertion
//     // ['clean'] // Remove formatting
//   ]
// };

export const quillConfig = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': [1, 2, false] }], // H1, H2, and normal text
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image', 'video'], // Link, image, and video insertion
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'] // Remove formatting
  ]
};
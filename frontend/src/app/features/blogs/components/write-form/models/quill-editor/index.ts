// // Add fonts to whitelist
// import Quill from 'quill';
// const Font = Quill.import('formats/font');
// // We do not add Aref Ruqaa since it is the default
// Font.whitelist = [
//   "roboto", "lato", "futura", "times new roman"
// ];
// Quill.register(Font, true);

// export const quillConfig = {
//   toolbar: [
//     ['bold', 'italic', 'underline', 'strike'],
//     ['blockquote', 'code-block'],
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//     ['link', 'image', 'video'],
//     [{ 'script': 'sub' }, { 'script': 'super' }],
//     [{ 'indent': '-1' }, { 'indent': '+1' }],
//     [{ 'direction': 'rtl' }],
//     [{ 'size': ['small', false, 'large', 'huge'] }],
//     [{ 'color': [] }, { 'background': [] }],
//     [{ 'font': [] }],
//     [{ 'align': [] }],
//     ['clean']
//   ]
// };

// const quill = new Quill('#editor', {
//   modules: quillConfig,
//   theme: 'snow',
// });

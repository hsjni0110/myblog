import react, { useRef, useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';

// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
const toolbarOptions = [
	['link', 'image', 'video'],
	[{ header: [1, 2, 3, false] }],
	['bold', 'italic', 'underline', 'strike'],
	['blockquote'],
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ color: [] }, { background: [] }],
	[{ align: [] }],
];

// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
export const formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'align',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'background',
	'color',
	'link',
	'image',
	'video',
	'width',
];

const modules = {
	toolbar: {
		container: toolbarOptions,
	},
};

interface IEditor {
	contentValue: string; 
	setContentValue: (value: string) => void;
}
interface QuillFileStateProps {
	base64: string;
	file: File;
}
const Editor = ({ contentValue, setContentValue }: IEditor) => {
	const quillRef = useRef<ReactQuill>(null);

	const [quillFileState, setQuillFileState] = useState<QuillFileStateProps[]>([]);

	const uploadImage = (file:File, filePath:string) => {
		const storageRef = ref(storage, filePath);

		const upLoadTask = uploadBytesResumable(storageRef, file);

		upLoadTask.on(
			'state_changed',
			(snapshot) => {},
			(error) => {}
		);
		return getDownloadURL(storageRef);
	};

	const imageHandler = () => {
		if (quillRef.current) {
			const editor = quillRef.current?.getEditor();
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');
			input.click();
			input.onchange = async () => {
				const file = input?.files[0];

				// 현재 커서 위치 저장
				const range: any = editor.getSelection();

				// 서버에 올려질때까지 표시할 로딩 placeholder 삽입
				editor.insertEmbed(range.index, 'image', `./images/loading.gif`);

				try {
					// 이런식으로 서버에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현하면 된다
					const filePath = `images/${file.name}`;
					
					const url = await uploadImage(file, filePath)
					
					
					// 정상적으로 업로드 됐다면 로딩 placeholder 삭제
					editor.deleteText(range.index, 1);
					// // 받아온 url을 이미지 태그에 삽입
					editor.insertEmbed(range.index, 'image', url);

					// 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
					editor.setSelection(range.index + 1);
					
					
				} catch (e) {
					console.log(e);
				}
			};
		}
	};
	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
					[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
					['link', 'image'],
					['clean'],
				],
				handlers: { image: imageHandler },
			},
		}),
		[]
	);
	return (
		// 테마 (bubble, snow, custom) https://quilljs.com/docs/themes/
		<ReactQuill
			ref={quillRef}
			value={contentValue || ''}
			theme="snow"
			modules={modules}
			formats={formats}
			onChange={(content, delta, source, editor) => setContentValue(editor.getHTML())}
		></ReactQuill>
	);
};

export default Editor;
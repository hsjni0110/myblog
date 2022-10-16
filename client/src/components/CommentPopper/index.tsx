import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';
import {
	EditBackground,
	EditDiv,
	EditInput,
	Popper,
	CommentEditContainer,
	Input,
	Button,
	Information,
} from './styles';
import useSWR from 'swr';
import { Board } from '@typings/type';
import fetcher from '@utils/fetcher';
import { AnimatePresence } from 'framer-motion';

interface ICommentPopper {
	posting_id: string | undefined;
	comment_id: number;
	value: string;
}

const CommentPopper = ({ value, posting_id, comment_id }: ICommentPopper) => {
	const { data, error, mutate } = useSWR<Board | undefined>(`/api/boards/${posting_id}`, fetcher);

	// popper
	const [popper, setPopper] = useState<boolean>(false);
	// isEditing
	const [isEditing, setIsEditing] = useState<boolean>(false);
	// isDeleting
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	// nickname
	const [nickname, setNickname] = useState<string>('');
	// password
	const [password, setPassword] = useState<string>('');

	// 수정 창 on/off
	const [editPage, setEditPage] = useState<boolean>(false);

	// 수정의 Default value
	const [editValue, setEditValue] = useState<string>(value);

	// 잘못된 정보 value
	const [misinformation, setMisinformation] = useState<boolean>(false);

	// 삭제 완료 value
	const [deleteComplete, setDeleteComplete] = useState<boolean>(false);
	
	/* popper 클릭 시 */
	const onClickPopper = (e: any) => {
		e.preventDefault();
		setPopper((prev: boolean) => !prev);
	};

	/* 수정하기 클릭 시*/
	const onClickEdit = (e: any) => {
		e.preventDefault();
		setIsEditing(true);
	};
	/* 수정하기 끝낼 시*/
	const onClickEditEnd = (e: any) => {
		e.preventDefault();
		setIsEditing(false);
	};

	/* 삭제하기 클릭 시*/
	const onClickDelete = (e: any) => {
		e.preventDefault();
		setIsDeleting(true);
	};
	/* 삭제하기 끝낼 시*/
	const onClickDeleteEnd = (e: any) => {
		e.preventDefault();
		setIsDeleting(false);
	};
	/* 버블링 방지 */
	const preventBubbling = (e: any) => {
		e.stopPropagation();
	};
	/* 인증 버튼 클릭 시 */
	const ClickCertification = (e: any) => {
		e.preventDefault();

		axios
			.post(`/api/comments/certify/${posting_id}/${comment_id}`, {
				name: nickname,
				password,
			})
			.then((response) => {
				if (response.data) {
					setEditPage(response.data);
					setIsEditing(false);
					setPopper(false);
				} else {
					setIsEditing(false);
					setPopper(false);
					setMisinformation(true);

					setTimeout(() => {
						setMisinformation(false);
					}, 2000);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	/* 닉네임 변경 시 */
	const onChangeNickname = (e: any) => {
		setNickname(e.target.value);
	};

	/* 비밀번호 변경 시 */
	const onChangePassword = (e: any) => {
		setPassword(e.target.value);
	};
	/* 수정 내용 변경 시 */
	const onChangeEditContents = (e: any) => {
		setEditValue(e.target.value);
	};
	/* 수정 창 닫기*/
	const onClickEditPageEnd = (e: any) => {
		setEditPage(false);
	};
	
	/* 삭제 버튼 클릭 시 */
	const onClickDeleteButton = (e:any) => {
		e.preventDefault();
		
		axios.post(`/api/comments/delete/${posting_id}/${comment_id}`,{
			name:nickname,
			password
		})
		.then((response) => {
			console.log(response);
			mutate();
			setPopper(false);
			setDeleteComplete(true);
			
			setTimeout(() => {
				setDeleteComplete(false);
			},2000)
		})
		.catch((error) => {
			console.error(error);
		})
	}

	/* 수정 내용 보내기 */
	const onSubmitEdit = (e: any) => {
		axios
			.patch(`/api/comments/update/${posting_id}/${comment_id}`, {
				name: nickname,
				password,
				contents: editValue,
			})
			.then((response) => {
				mutate();
				setEditPage(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div style={{ position: 'relative', display: 'flex' }}>
			<SettingsIcon
				sx={{ cursor: 'pointer' }}
				fontSize="small"
				color="action"
				onClick={onClickPopper}
			/>
			<AnimatePresence>
				{deleteComplete ? (
					<Information
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						>
						<h3>해당 댓글을 삭제했습니다!</h3>
					</Information>
				) : null}
			</AnimatePresence>
			
			<AnimatePresence>
				{misinformation ? (
					<Information
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						>
						<h3>오류:사용자 정보 혹은 비밀번호가 일치하지 않습니다.</h3>
					</Information>
				) : null}
			</AnimatePresence>
			{popper ? (
				<>
					<Popper>
						<div style={{ cursor: 'pointer' }} onClick={onClickEdit}>
							수정하기
						</div>
						<div style={{ cursor: 'pointer' }} onClick={onClickDelete}>
							삭제하기
						</div>
					</Popper>

					{isEditing ? (
						<div
							style={{
								position: 'fixed',
								top: '0',
								left: '0',
								height: '100vh',
								width: '100vw',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							onClick={onClickEditEnd}
						>
							<CommentEditContainer onClick={preventBubbling}>
								<h3>닉네임</h3>
								<Input value={nickname} onChange={onChangeNickname} />
								<h3>비밀번호</h3>
								<Input
									value={password}
									onChange={onChangePassword}
									type="password"
								/>
								<Button onClick={ClickCertification}>인증하기</Button>
							</CommentEditContainer>
						</div>
					) : null}

					{isDeleting ? (
						<div
							style={{
								position: 'fixed',
								top: '0',
								left: '0',
								height: '100vh',
								width: '100vw',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							onClick={onClickDeleteEnd}
						>
							<CommentEditContainer onClick={preventBubbling}>
								<h3>닉네임</h3>
								<Input value={nickname} onChange={onChangeNickname} />
								<h3>비밀번호</h3>
								<Input type="password" value={password} onChange={onChangePassword} />
								<Button onClick={onClickDeleteButton} style={{ background: '#CA2B53', color: 'white' }}>
									삭제하기
								</Button>
							</CommentEditContainer>
						</div>
					) : null}
				</>
			) : null}
			{editPage ? (
				<EditBackground>
					<EditDiv>
						<EditInput value={editValue} onChange={onChangeEditContents} />
						<div style={{ display: 'flex', justifyContent: 'end' }}>
							<Button onClick={onSubmitEdit} style={{ width: '5em' }}>
								적용
							</Button>
							<Button
								onClick={onClickEditPageEnd}
								style={{ marginLeft: '1em', width: '5em' }}
							>
								닫기
							</Button>
						</div>
					</EditDiv>
				</EditBackground>
			) : null}
		</div>
	);
};

export default CommentPopper;
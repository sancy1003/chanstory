import React from 'react';
import * as S from '@styles/components/modal/confirmModal.style';

interface Props {
  isView: boolean;
  fn: () => void;
  cancel: () => void;
  confirmMessage?: string;
  message: string;
}

const ConfirmModal = ({
  isView,
  fn,
  cancel,
  confirmMessage,
  message,
}: Props) => {
  if (!isView) return null;
  return (
    <S.ConfirmModalContainer>
      <S.ConfirmModalBox>
        <S.Message>{message}</S.Message>
        <S.ButtonBox>
          <button onClick={fn}>
            {confirmMessage ? confirmMessage : '확인'}
          </button>
          <button onClick={cancel}>취소</button>
        </S.ButtonBox>
      </S.ConfirmModalBox>
    </S.ConfirmModalContainer>
  );
};

export default ConfirmModal;

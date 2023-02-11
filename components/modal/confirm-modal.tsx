import React from 'react';
import styles from '@styles/modal.module.css';

interface ConfirmModalProps {
  isView: boolean;
  fn: () => void;
  cancel: () => void;
  confirmMessage?: string;
  message: string;
}

export default function ConfirmModal({
  isView,
  fn,
  cancel,
  confirmMessage,
  message,
}: ConfirmModalProps) {
  if (!isView) return null;
  return (
    <div className={styles.cover}>
      <div className={styles.modalWrap}>
        <div className={styles.modalMessage}>{message}</div>
        <div className={styles.modalBtnBox}>
          <button onClick={fn}>
            {confirmMessage ? confirmMessage : '확인'}
          </button>
          <button onClick={cancel}>취소</button>
        </div>
      </div>
    </div>
  );
}

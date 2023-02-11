import React, { useEffect } from 'react';
import styles from '@styles/modal.module.css';
import { useForm } from 'react-hook-form';
import Lottie from 'react-lottie-player';
import ring from '@resource/lottie/ring.json';

interface ChangeNicknameResponse {
  result: boolean;
  error?: string;
  nickname: string;
}
interface NicknameChangeModalProps {
  isView: boolean;
  fn: ({ text }: { text: string }) => void;
  cancel: () => void;
  confirmMessage?: string;
  changeNicknameLoading: boolean;
  changeNicknameData: ChangeNicknameResponse | undefined;
}
interface InputForm {
  text: string;
}

export default function NicknameChangeModal({
  isView,
  fn,
  cancel,
  confirmMessage,
  changeNicknameLoading,
  changeNicknameData,
}: NicknameChangeModalProps) {
  const {
    setError,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<InputForm>();
  useEffect(() => {
    if (
      changeNicknameData &&
      !changeNicknameData.result &&
      changeNicknameData.error
    ) {
      setError('text', {
        type: 'alreadyExists',
        message: changeNicknameData.error,
      });
    } else if (changeNicknameData && changeNicknameData.result) {
      reset();
    }
  }, [changeNicknameData]);

  if (!isView) return null;
  return (
    <div className={styles.cover}>
      <form onSubmit={handleSubmit(fn)} className={styles.modalWrap}>
        {changeNicknameLoading ? (
          <Lottie
            loop
            animationData={ring}
            play
            style={{ width: 114, height: 114, margin: '0 auto' }}
          />
        ) : (
          <>
            <div className={styles.modalInputbox}>
              <div className={styles.modalMessage} style={{ marginBottom: 10 }}>
                변경할 닉네임을 입력해주세요.
              </div>
              <input
                {...register('text', {
                  required: '변경할 닉네임을 입력해주세요.',
                  minLength: {
                    value: 2,
                    message: '닉네임이 너무 짧아요. (2 ~ 16자)',
                  },
                  maxLength: {
                    value: 16,
                    message: '닉네임이 너무 길어요. (2 ~ 16자)',
                  },
                })}
                placeholder="2 ~ 16자"
                className={styles.modalInput}
              />
              {errors && (
                <div className={styles.modalError}>{errors?.text?.message}</div>
              )}
            </div>
            <div className={styles.modalBtnBox}>
              <button>{confirmMessage ? confirmMessage : '확인'}</button>
              <div
                className={styles.btnCancel}
                onClick={() => {
                  reset();
                  cancel();
                }}
              >
                취소
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

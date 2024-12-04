import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { prisma } from '@prisma/client';

type CommentFormProps = {
  clubId: number;
};

const CommentForm: React.FC<CommentFormProps> = ({ clubId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { content:string }) => {
    setLoading(true);
    try {
      await prisma.comment.create({
        data: {
          content: data.content,
          clubId,
        },
      });
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('content')} required />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};

export default CommentForm;
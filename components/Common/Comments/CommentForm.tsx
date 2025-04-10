"use client";

import React, { useState } from "react";
import { commentsService } from "@/services/index";
import toast from "react-hot-toast";
import { Comment } from "@/typings/comment";
import TextButton from "@/components/Buttons/TextButton";
import FilledButton from "@/components/Buttons/FilledButton";
import CustomTextAreaInput from "@/components/Inputs/CustomTextAreaInput";
import { Typography } from "@/constants/typography";

interface CommentFormProps {
  commentableId: string;
  commentableType: string;
  onCommentAdded: (comment: Comment) => void;
  onCancel?: () => void;
  initialValue?: string;
  isEditing?: boolean;
  commentId?: string;
}

const CommentForm = ({
  commentableId,
  commentableType,
  onCommentAdded,
  onCancel,
  initialValue = "",
  isEditing = false,
  commentId,
}: CommentFormProps) => {
  const [content, setContent] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      if (isEditing && commentId) {
        const data = new FormData();
        data.append("content", content);
        const updatedComment = await commentsService.update(commentId, data);
        toast.success("Comentário atualizado");
        onCommentAdded(updatedComment);
      } else {
        const data = new FormData();
        data.append("content", content);
        data.append("commentable_id", commentableId);
        data.append("commentable_type", commentableType);
        const newComment = await commentsService.create(data);
        toast.success("Comentário adicionado");
        onCommentAdded(newComment);
        setContent("");
      }
    } catch (err) {
      console.error("Falha ao enviar comentário", err);
      toast.error("Falha ao enviar comentário");
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomTextAreaInput
        placeholder="Escreva seu comentário..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isSubmitting}
      />
      <div className="mt-3 flex justify-end space-x-3">
        {isEditing && onCancel && (
          <TextButton
            text="Cancelar"
            typography={Typography.Label}
            onClick={onCancel}
          />
        )}
        <FilledButton
          type="submit"
          text="Comentar"
          typography={Typography.Label}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default CommentForm;

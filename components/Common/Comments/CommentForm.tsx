"use client";

import React, { useState } from "react";
import { commentsService } from "@/services/index";
import toast from "react-hot-toast";
import { Comment} from "@/typings/comment";

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
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full border rounded p-2 focus:outline-none focus:ring"
        rows={3}
        placeholder="Escreva seu comentário..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isSubmitting}
      />
      <div className="mt-2 flex items-center space-x-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Atualizar" : "Enviar"}
        </button>
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;

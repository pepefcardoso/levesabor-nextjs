"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Comment } from "@/typings/comment";
import { commentsService } from "@/services/index";
import useAuthStore from "@/store/authStore";
import EmptyList from "../../Others/EmptyList";
import PageSkeleton from "../../Skeletons/PageSkeleton";
import toast from "react-hot-toast";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface CommentsListProps {
  commentableId: string;
  commentableType: string;
}

const CommentsList = ({ commentableId, commentableType }: CommentsListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const fetchComments = useCallback(async () => {
    try {
      const data = await commentsService.getAll(
        { page: 1, per_page: 50 },
        { commentable_id: commentableId, commentable_type: commentableType }
      );
      setComments(data.data as Comment[]);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
      toast.error("Falha ao carregar comentários");
    } finally {
      setIsLoading(false);
    }
  }, [commentableId, commentableType]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleCommentUpdated = (updatedComment: Comment) => {
    setComments((prev) =>
      prev.map((c) => (c.id === updatedComment.id ? updatedComment : c))
    );
  };

  const handleCommentDeleted = (deletedCommentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== deletedCommentId));
  };

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="mt-8">
      {isAuthenticated && (
        <CommentForm
          commentableId={commentableId}
          commentableType={commentableType}
          onCommentAdded={handleCommentAdded}
        />
      )}
      {comments.length === 0 ? (
        <EmptyList
          title="Sem comentários"
          description="Seja o primeiro a comentar!"
        />
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onCommentUpdated={handleCommentUpdated}
              onCommentDeleted={handleCommentDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;

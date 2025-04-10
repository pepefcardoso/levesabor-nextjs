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
import { PaginationResponse } from "@/typings/pagination";
import IconButton from "@/components/Buttons/IconButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import { txtColors } from "@/constants/colors";

interface CommentsListProps {
  commentableId: string;
  commentableType: string;
}

const CommentsList = ({ commentableId, commentableType }: CommentsListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const fetchComments = useCallback(async (page = 1) => {
    try {
      const response: PaginationResponse<Comment> = await commentsService.getAll(
        { page, per_page: 5 },
        { commentable_id: commentableId, commentable_type: commentableType }
      );

      setComments(response.data);
      setCurrentPage(response.current_page);
      setLastPage(response.last_page);
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

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;
    setIsLoading(true);
    fetchComments(newPage);
  };

  if (isLoading) return <PageSkeleton />;

  return (
    <div>
      {isAuthenticated && (
        <div className="mb-6">
        <CommentForm
          commentableId={commentableId}
          commentableType={commentableType}
          onCommentAdded={() => fetchComments(1)}
        />
        </div>
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
              onCommentUpdated={() => fetchComments(1)}
              onCommentDeleted={() => fetchComments(1)}
            />
          ))}
        </div>
      )}

      {lastPage > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <IconButton
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            Icon={FaArrowLeft}
          />
          <span className={clsx(Typography.Body, txtColors.gray700)}>
            Página {currentPage} de {lastPage}
          </span>
          <IconButton
            disabled={currentPage >= lastPage}
            onClick={() => handlePageChange(currentPage + 1)}
            Icon={FaArrowRight}
          />
        </div>
      )}
    </div>
  );
};

export default CommentsList;

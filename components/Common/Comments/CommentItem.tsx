"use client";

import React, { useState } from "react";
import { Comment } from "@/typings/comment";
import { commentsService } from "@/services/index";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";
import CommentForm from "./CommentForm";
import { formatDate } from "../../../tools/helper";

interface CommentItemProps {
    comment: Comment;
    onCommentUpdated: (comment: Comment) => void;
    onCommentDeleted: (commentId: string) => void;
}

const CommentItem = ({
    comment,
    onCommentUpdated,
    onCommentDeleted,
}: CommentItemProps) => {
    const { user: currentUser } = useUserStore((state) => state);
    const isOwner = currentUser && currentUser.id === comment.user?.id;
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        if (confirm("Deseja realmente excluir este comentário?")) {
            try {
                await commentsService.delete(comment.id!);
                toast.success("Comentário excluído com sucesso");
                onCommentDeleted(comment.id!);
            } catch (err) {
                console.error("Falha ao excluir comentário", err);
                toast.error("Falha ao excluir comentário");
            }
        }
    };

    const handleEditSubmit = (updatedComment: Comment) => {
        onCommentUpdated(updatedComment);
        setIsEditing(false);
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <div className="font-bold">{comment.user?.name || "Anônimo"}</div>
                <div className="text-xs text-gray-500">{formatDate(comment.created_at ?? "")}</div>
            </div>
            {isEditing ? (
                <CommentForm
                    initialValue={comment.content}
                    commentableId={comment.commentable_id}
                    commentableType={comment.commentable_type}
                    onCommentAdded={handleEditSubmit}
                    onCancel={() => setIsEditing(false)}
                    isEditing={true}
                    commentId={comment.id}
                />
            ) : (
                <p className="mb-2">{comment.content}</p>
            )}
            {isOwner && !isEditing && (
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-500 hover:underline flex items-center space-x-1"
                    >
                        <FaEdit />
                        <span>Editar</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-red-500 hover:underline flex items-center space-x-1"
                    >
                        <FaTrash />
                        <span>Excluir</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentItem;

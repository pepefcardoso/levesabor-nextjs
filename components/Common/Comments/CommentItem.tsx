"use client";

import React, { useState } from "react";
import { Comment } from "@/typings/comment";
import { commentsService } from "@/services/index";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";
import CommentForm from "./CommentForm";
import { formatDate, sanitizeImageUrl } from "../../../tools/helper";
import IconButton from "@/components/Buttons/IconButton";
import { iconColors, txtColors } from "@/constants/colors";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import Image from "next/image";

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
        <div className="p-4 rounded-lg shadow-md bg-white space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="relative shadow-sm w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            src={sanitizeImageUrl(comment.user?.image?.url)}
                            alt={comment.user?.name || "Usuário"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className={clsx(Typography.Subtitle)}>{comment.user?.name || "Usuário"}</h2>
                </div>
                <p className={clsx(Typography.Quote, txtColors.gray500)}>{formatDate(comment.updated_at ?? "")}</p>
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
                <p className={clsx(Typography.Caption, txtColors.gray700, "mb-2")}>{comment.content}</p>
            )}
            {isOwner && !isEditing && (
                <div className="flex justify-end space-x-1">
                    <IconButton
                        onClick={() => setIsEditing(true)}
                        Icon={FaEdit}
                        color={iconColors.gray}
                        size={16}
                    />
                    <IconButton
                        onClick={handleDelete}
                        Icon={FaTrash}
                        color={iconColors.red}
                        size={16}
                    />
                </div>
            )}
        </div>
    );
};

export default CommentItem;

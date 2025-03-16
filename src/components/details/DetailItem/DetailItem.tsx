import React from "react";

import { DetailItemProps } from "./types";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import {
  AvatarContainer,
  DetailBody,
  DetailContainer,
  DetailHeader,
  DetailItemContainer,
} from "./DetailItem.styles";

const DetailItem: React.FC<DetailItemProps> = ({
  author,
  createdAt,
  bodyHTML,
  avatarUrl,
}) => {
  return (
    <DetailItemContainer data-testid="detail-item">
      <AvatarContainer>
        <Image
          src={avatarUrl || "/avatar_placeholder.png"}
          alt={`Avatar of ${author || "GitHub user"}`}
          width={50}
          height={50}
          data-testid="detail-item-avatar"
        />
      </AvatarContainer>
      <DetailContainer>
        <DetailHeader>
          <strong>{author}</strong>
          <span>on {formatDate(createdAt)}</span>
        </DetailHeader>
        <DetailBody data-testid="detail-item-body" dangerouslySetInnerHTML={{ __html: bodyHTML || "" }} />
      </DetailContainer>
    </DetailItemContainer>
  );
};

export default React.memo(DetailItem);

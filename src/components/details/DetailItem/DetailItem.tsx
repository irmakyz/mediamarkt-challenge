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
    <DetailItemContainer>
      <AvatarContainer>
        <Image
          src={avatarUrl || "/avatar_placeholder.png"}
          alt={author || "github user"}
          width={50}
          height={50}
        />
      </AvatarContainer>
      <DetailContainer>
        <DetailHeader>
          <strong>{author}</strong>
          <span>on {formatDate(createdAt)}</span>
        </DetailHeader>
        <DetailBody dangerouslySetInnerHTML={{ __html: bodyHTML || "" }} />
      </DetailContainer>
    </DetailItemContainer>
  );
};

export default DetailItem;

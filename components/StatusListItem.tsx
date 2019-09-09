import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { StatusIcon } from "./StatusIcon";
import { Status } from "../utils/api";
import { TimeAgo } from "./TimeAgo";

const Container = styled.a<{ selected: boolean | undefined }>`
  transition: 0.2s ease background-color;
  display: flex;
  margin: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  outline: 0;
  border: 0;
  text-decoration: none;

  width: 100%;
  height: 4rem;
  font-size: 0.8125rem;
  line-height: 0.875rem;
  color: ${props => props.theme.white};

  padding: 0.5rem 1rem;

  align-items: center;

  border-bottom: 1px solid ${props => props.theme.bg3};

  @media screen and (max-width: 768px) {
    &:hover {
      background-color: ${props => props.theme.bg1Hover};
    }
  }

  @media screen and (min-width: 769px) {
    ${props =>
      props.selected
        ? css`
            background-color: ${props => props.theme.bg3};
          `
        : css`
            &:hover {
              background-color: ${props => props.theme.bg1Hover};
            }
          `}
  }
`;

const Title = styled.div`
  font-weight: 500;
  flex: 1;
`;

const Description = styled.div`
  font-weight: 400;

  line-height: 1.25;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  margin-right: 0.5rem;
`;

const InfoContainer = styled.div`
  text-align: left;
  width: 100%;
`;

const StyledTimeAgo = styled(TimeAgo)`
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 0.25rem;
`;

interface Props {
  title: string;
  description: string;
  timestamp: number;
  status: Status;
  link: { href: string; as: string };
  selected?: boolean;
}

export const StatusListItem = ({
  title,
  description,
  timestamp,
  status,
  selected,
  link
}: Props) => {
  return (
    <Link passHref href={link.href} as={link.as}>
      <Container selected={selected}>
        <StatusContainer>
          <StatusIcon status={status} />
        </StatusContainer>
        <InfoContainer>
          <Info>
            <Title>{title}</Title>
            <StyledTimeAgo date={timestamp} />
          </Info>

          <Description>{description}</Description>
        </InfoContainer>
      </Container>
    </Link>
  );
};

const EmptyStatus = styled.div`
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  background-color: ${props => props.theme.bg3};
`;

const EmptyText = styled.div`
  border-radius: 2px;
  width: 12rem;
  height: 1rem;
  margin-left: 1.5rem;
  background-color: ${props => props.theme.bg3};
`;

export const StatusListSkeletonItem = () => (
  <div>
    <Container selected={false}>
      <StatusContainer>
        <EmptyStatus />
      </StatusContainer>
      <InfoContainer>
        <EmptyText />
      </InfoContainer>
    </Container>
  </div>
);

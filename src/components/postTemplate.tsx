import React from "react";
import styled from "styled-components";

interface PostTemplateProps {
  children: JSX.Element;
}

const Container = styled.section``;

function PostTemplate({ children }: PostTemplateProps) {
  return <Container>{children}</Container>;
}

export default PostTemplate;

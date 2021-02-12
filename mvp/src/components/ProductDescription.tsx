import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CATEGORIES } from "../constants/copy";
import { PrimaryMedium, PrimaryText } from "../designSystem";
import EmailCaptureForm from "./EmailCaptureForm";

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 100px;
`;

const TitleDiv = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled(PrimaryMedium)`
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-style: normal;
  font-weight: 600;
`;

const Description = styled(PrimaryText)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  width: 560px;
  margin-bottom: 64px;
`;

const FormContainer = styled.div``;

const ProductDescription = () => {
  const { categoryID } = useParams<{ categoryID: string }>();
  const category = CATEGORIES[categoryID];
  const copy = category.description;

  return (
    <DescriptionContainer className="product-description">
      <TitleDiv>
        <Title>Coming Soon</Title>
      </TitleDiv>
      <Description>{copy}</Description>
      <FormContainer>
        <EmailCaptureForm theme="light"></EmailCaptureForm>
      </FormContainer>
    </DescriptionContainer>
  );
};

export default ProductDescription;
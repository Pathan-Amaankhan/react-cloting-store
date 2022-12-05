import styled, {css} from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
  
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;

const baseContainer = css`
  width: 23%;
  user-select: none; /* Normal (chrome)*/
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;

export const Quantity = styled.div`
  ${baseContainer};
  display: flex;
`;

export const Arrow = styled.div`
  ${baseContainer};
  cursor: pointer;
`;

export const Value = styled.div`
  ${baseContainer};
  margin: 0 10px;
`;

export const Name = styled.div`
  ${baseContainer};
`;

export const Price = styled.div`
  ${baseContainer};
`;
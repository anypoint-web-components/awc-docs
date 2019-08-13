import { css } from 'lit-element';

export const baseStyles = css`
html {
  font-size: 15px;
  line-height: 20px;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', 'Noto', sans-serif;
  background-color: #fafafa;
  color: #5f6368;
}
p {
  margin: 1.40em 0;
}
ul {
  padding-left: 20px;
}
`;

export const headersStyles = css`
h2 {
  font-size: 60px;
  color: #202124;
  font-weight: 400;
  line-height: 1.2;
}
h3 {
  font-size: 24px;
  color: #202124;
  font-weight: 400;
  line-height: 1.2;
}
h4 {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 8px;
}
body.styled.dark h2,
body.styled.dark h3,
body.styled.dark h4 {
  color: #F5F5F5;
}
`;
export const demoContentStyles = css`
.centered {
  max-width: 700px;
  margin: 20px auto 20px;
}

.horizontal {
  display: flex;
  flex-direction: row;
}

.vertical {
  display: flex;
  flex-direction: column;
}

details {
  margin: 20px 0;
}

details summary {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 8px;
}`;

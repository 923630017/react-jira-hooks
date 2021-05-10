import styled from '@emotion/styled';
// 样式组件
export const Row = styled.div<{
    gap?: number | boolean;
    marginBottom?: number;
    between?: boolean;
}>`
    display:flex;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    align-items: center;
    margin-bottom: ${ props => props.marginBottom + 'rem' };
    > * {
      margin-top: 0!important;
      margin-bottom: 0!important;
      margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined}
    }
`
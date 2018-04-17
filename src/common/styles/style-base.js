import styled, { css } from 'styled-components'

export const colorBlue = '#00bcce'
export const colorBlack = '#252c3c'
export const colorGrey = '#9aadbc'

export const fontPrompt = "'Prompt'" 
export const cssFont = css`
  font-family: ${fontPrompt}, sans-serif;
`

export const cssFontP = css`
  ${cssFont}
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.1rem;
`
export const cssFontH3 = css`
  ${cssFont}
  font-weight: 400;
  font-size: 1.2rem;
  letter-spacing: 0.005rem;
  line-height: 1.3rem;
`
export const cssFontH2 = css`
  ${cssFont}
  font-weight: 400;
  letter-spacing: 0.01rem;
  font-size: 1.5rem;
  line-height: 1.7rem;
`
export const cssFontH1 = css`
  ${cssFont}
  font-weight: 400;
  letter-spacing: 0.02rem;
  font-size: 2rem;
  line-height: 2.2rem;
`
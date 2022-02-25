import type { FC } from 'react'
import { SyntaxHighlighter } from '@storybook/components'
import type { SyntaxHighlighterProps } from '@storybook/components'

interface SourceProps extends SyntaxHighlighterProps {
  file?: string
}

export const Source: FC<SourceProps> = ({ file, ...p }) => (
  <div className="docblock-source">
    {file && <p className="docblock-file">📄 {file}</p>}
    <SyntaxHighlighter {...p} />
  </div>
)

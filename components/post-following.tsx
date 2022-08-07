import React, { useRef } from 'react'
import IcBaselineAdd from '~icons/ic/baseline-add'
import IcBaselineCheck from '~icons/ic/baseline-check'
import IcBaselineClose from '~icons/ic/baseline-close'
import useHover from '../hooks/useHover'

interface PostFollowingProps {
  className?: string
  following: boolean
  onClick?: (e: any) => void
}

const PostFollowing: React.FC<PostFollowingProps> = (props) => {
  const { className, following, onClick } = props

  const elRef = useRef(null)
  const isHovering = useHover(elRef, {
    onEnter: () => {
      console.log('onEnter')
    },
    onLeave: () => {
      console.log('onLeave')
    },
    onChange: (isHover) => {
      console.log('onChange', isHover)
    },
  })

  return (
    <a ref={elRef} className={className} onClick={onClick}>
      {following ? (
        isHovering ? (
          <>
            <IcBaselineClose />
            取消关注
          </>
        ) : (
          <>
            <IcBaselineCheck />
            已关注
          </>
        )
      ) : (
        <>
          <IcBaselineAdd />
          关注
        </>
      )}
    </a>
  )
}

export default PostFollowing

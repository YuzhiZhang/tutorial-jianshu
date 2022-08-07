import Image, { ImageProps } from 'next/image'
import React from 'react'

type PostImageProps = ImageProps & {
  href?: string
  className?: string
  onClick?: (e: any) => void;
}

const PostImage: React.FC<PostImageProps> = React.forwardRef<
  any,
  PostImageProps
>(({ onClick, href, ...props }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Image
        className="img-blur-done"
        alt="Post Image"
        width={150}
        height={100}
        {...props}
      />
    </a>
  )
})

PostImage.displayName = 'PostImage'

export default PostImage

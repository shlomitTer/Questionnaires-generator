import React from 'react'
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import { APP_ROUTING_PATHS } from '../../app/constants'
interface IProps {
  url: string,
  title: string
}

const ShareButtons = (props: IProps) => {
  //להגדיר URL
  return (
    <div className='end'>
      <FacebookShareButton
        url={props.url}
        quote={props.title}
        hashtag="#quiz"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <WhatsappShareButton
        title={props.title}
        separator={''}
        url={props.url}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <EmailShareButton
        subject={props.title}
        body={""}
        separator={''}
        url={props.url}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  )
}

export default ShareButtons
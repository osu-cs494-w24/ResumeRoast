import React from "react";
import { DiscussionEmbed } from "disqus-react";
import "./DisqusComments.css"

export default function DisqusComments(props){
    const {id} = props

    return(
        <div className="disqusComments">
            <DiscussionEmbed
                shortname='resumeroast'
                config={
                    {
                        url: window.location.host + window.location.pathname,
                        identifier: id,
                        title: "Comments",
                        language: 'en_US'
                    }
                }
            />
        </div>
    )
}
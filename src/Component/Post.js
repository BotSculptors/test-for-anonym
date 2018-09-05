import React from 'react';
import axios from 'axios';
import {PostInfo} from './Post_Components/PostInfo';
import {Social} from './Post_Components/Social';


export class Posts extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      Posts: [],
      Type: 1,
      Count: 100,
      Offset: 0
    })

  }

  componentDidMount = () =>{


    const Data = {
      "type": this.state.Type,
      "count": this.state.Count,
      "offset": this.state.Offset
}

    axios  ({
        method: 'post',
        url: 'http://dev.apianon.ru:3000/posts/get',
        data: Data
      })
        .then(res => {
          console.log(res.data.data);
          this.setState({
             Posts: res.data.data,
           });

        })
        .catch(res => {
            //handle error
            console.log(res);
        });


  }
  render(){
    return (
      <div className="Posts" >
          {this.state.Posts.map((post, i) =>


            <div className='Post' key={post.id} >



                <PostInfo
                  postText={post.text}
                  postFoto={post.attachments[0].photo.photo_medium === undefined ? post.attachments[0].photo.photo_small : post.attachments[0].photo.photo_medium }
                  />
                <Social
                  share={post.reposts}
                  like={post.likes.count}
                  dislike={post.dislikes.count}
                  comments={post.comments.count}
                  postviews={post.postviews.count}
                  />








            </div>



          )}

      </div>
    )
  };
}
